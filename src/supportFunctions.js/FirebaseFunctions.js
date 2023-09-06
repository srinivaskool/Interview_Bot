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
  updateDoc
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

export async function addDataToRealTimeDatabase(data, realTimeDBPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const newKey = push(ref1(db, realTimeDBPath), {
        ...data,
      }).key;

      resolve(newKey);
    } catch (error) {
      console.error("Error updating value:", error);
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
      collection(fStore, "n-day-pack", useruid, "giftshub"),
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
