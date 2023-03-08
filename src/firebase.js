import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "react-chat-app-beda2.firebaseapp.com",
    projectId: "react-chat-app-beda2",
    storageBucket: "react-chat-app-beda2.appspot.com",
    messagingSenderId: "843096283871",
    appId: "1:843096283871:web:0252bf3614d73d6954676a"
  };
  

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
