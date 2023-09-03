import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "interviewbot-fb9ed.firebaseapp.com",
    projectId: "interviewbot-fb9ed",
    storageBucket: "interviewbot-fb9ed.appspot.com",
    messagingSenderId: "568350469608",
    appId: process.env.REACT_APP_FIREBASE_API_ID,
    measurementId: "G-HHGNX1GQP4",
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const fStore = getFirestore(app);
  