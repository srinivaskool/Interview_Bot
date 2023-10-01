import { child, get, push, ref as ref1, update } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, fStore } from "../firebase";

export async function updateDataInRealTimeDataBase(
  data,
  realTimeDBPath,
  realTimeDBKey
) {
  try {
    const slidePuzzleRef = ref1(db, realTimeDBPath);
    const childRef = child(slidePuzzleRef, realTimeDBKey);
    const updatedData = {
      ...data,
    };

    await update(childRef, updatedData);
    console.log("Value updated successfully!");
  } catch (error) {
    console.error("Error updating value:", error);
  }
}

export async function addDataToRealTimeDatabase(data, realTimeDBPath, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        const newKey = push(ref1(db, realTimeDBPath), {
          ...data,
        }).key;
        resolve(newKey);
      } else {
        // Check if the userId already exists in the database
        const keyRef = child(ref1(db, realTimeDBPath), userId);
        const snapshot = await get(keyRef);

        if (snapshot.exists()) {
          // If the userId exists, do nothing and resolve with the existing userId
          resolve(userId);
        } else {
          // If the key doesn't exist, update the data at that key
          await update(ref1(db, `${realTimeDBPath}/${userId}`), data);
          resolve(userId);
        }
      }
    } catch (error) {
      console.error("Error updating value:", error);
      reject(error);
    }
  });
}

export async function editDataInRealTimeDatabase(updatedValue, variablePath, realTimeDBPath, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        reject(new Error("User ID is required to edit data."));
        return;
      }

      // Check if the userId exists in the database
      const keyRef = child(ref1(db, realTimeDBPath), userId);
      const snapshot = await get(keyRef);

      if (snapshot.exists()) {
        // If the userId exists, construct the path to the specific variable
        const variablePathObject = {};
        variablePathObject[variablePath] = updatedValue;
        // Update the specific variable with the updated value
        await update(ref1(db, `${realTimeDBPath}/${userId}`), variablePathObject);
        resolve(userId);
      } else {
        // If the userId does not exist, reject with an error
        reject(new Error("User ID not found in the database."));
      }
    } catch (error) {
      console.error("Error editing value:", error);
      reject(error);
    }
  });
}

export async function incrementUserCredits(userId){
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        reject(new Error("User ID is required to edit data."));
        return;
      }

      // Check if the userId exists in the database
      const keyRef = child(ref1(db, "AllUsersData"), userId);
      const snapshot = await get(keyRef);

      if (snapshot.exists()) {
        // If the userId exists, construct the path to the specific variable
        const variablePathObject = {};
        console.log("dwaraka",snapshot.val().credits);

        variablePathObject["credits"] = snapshot.val().credits + 200;
        // Update the specific variable with the updated value
        await update(ref1(db, `${"AllUsersData"}/${userId}`), variablePathObject);
        resolve(userId);
      } else {
        // If the userId does not exist, reject with an error
        reject(new Error("User ID not found in the database."));
      }
    } catch (error) {
      console.error("Error editing value:", error);
      reject(error);
    }
  });
}

export function getDataFromRealtimeDatabase(realtimeDataPath) {
  const todoRef = ref1(db, realtimeDataPath);
  return new Promise((resolve, reject) => {
    get(todoRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          resolve(data); // Resolve with the retrieved data
        } else {
          resolve(null); // Resolve with null if no data available
        }
      })
      .catch((error) => {
        reject(error); // Reject with the error if any occurs
      });
  });
}


export async function addDataToFirestore({
  DSAQuestionsRealTimeDatabaseKeysArray,
  parent_collection,
  parent_document,
  child_collection,
}) {
  var collectionPath = collection(fStore, parent_collection);

  collectionPath = collection(
    collectionPath,
    parent_document,
    child_collection
  );

  try {
    let docRef;
    docRef = await addDoc(collectionPath, {
      DSAQuestionsRealTimeDatabaseKeysArray,
      timestamp: serverTimestamp(),
    });
    console.log("Document operation successful. Document ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error performing document operation: ", error);
    return null;
  }
}

export async function updateFirestoreVariable({
  parent_collection,
  parent_document,
  child_collection,
  child_document,
  variableToUpdate,
  updatedValue,
}) {
  var documentRef;
  if (child_collection) {
    documentRef = doc(
      fStore,
      parent_collection,
      parent_document,
      child_collection,
      child_document
    );
  } else {
    documentRef = doc(fStore, parent_collection, parent_document);
  }

  try {
    await updateDoc(documentRef, {
      [variableToUpdate]: updatedValue,
    });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function fetchDocumentFromFireStore(docRef) {
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const datanew = docSnap.data();
      const decryptionKey = datanew.encryptionKey;
      datanew.wishes = decryptedData(datanew.wishes, decryptionKey);
      datanew.Folder_name = decryptedData(datanew.Folder_name, decryptionKey);
      datanew.From_name = decryptedData(datanew.From_name, decryptionKey);
      datanew.Bday_date = decryptedData(datanew.Bday_date, decryptionKey);
      datanew.To_name = decryptedData(datanew.To_name, decryptionKey);
      datanew.fbimg = decryptedData(datanew.fbimg, decryptionKey);
      return datanew;
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}
export async function fetchUserAllPackData(useruid) {
  try {
    const q = query(
      collection(fStore, "dsa-code-evaluation", useruid, "interviewBot"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    const fetchedGifts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return fetchedGifts;
  } catch (error) {
    console.error("Error fetching gifts: ", error);
    return [];
  }
}
