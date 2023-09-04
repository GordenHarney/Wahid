// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfjgHMc3b5T_TrHMxe5Ytpd-644TDgiyo",
  authDomain: "instantchat-6a29c.firebaseapp.com",
  projectId: "instantchat-6a29c",
  storageBucket: "instantchat-6a29c.appspot.com",
  messagingSenderId: "425939146550",
  appId: "1:425939146550:web:6d7f339946ec8d8fe08597",
  measurementId: "G-WSYPPNENDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export { app, analytics, auth, db };