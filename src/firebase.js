import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "interviewbot-fb9ed.firebaseapp.com",
    projectId: "interviewbot-fb9ed",
    databaseURL: "https://interviewbot-fb9ed-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "interviewbot-fb9ed.appspot.com",
    messagingSenderId: "568350469608",
    appId: process.env.REACT_APP_FIREBASE_API_ID,
    measurementId: "G-HHGNX1GQP4",
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const db = getDatabase(app);
  export const fStore = getFirestore(app);
  