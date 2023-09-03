import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { fStore } from "../firebase";

export async function addDataToFirestore({
  userCode_data,
  evaluation_data,
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
      userCode_data,
      evaluation_data,
      timestamp: serverTimestamp(),
    });
    console.log("Document operation successful. Document ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error performing document operation: ", error);
    return null;
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
