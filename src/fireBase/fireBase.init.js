// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDbrypHUtqOa0WU9IcCH3IhmnrCiuOPQ",
  authDomain: "studymate-a0c1c.firebaseapp.com",
  projectId: "studymate-a0c1c",
  storageBucket: "studymate-a0c1c.firebasestorage.app",
  messagingSenderId: "1053926440011",
  appId: "1:1053926440011:web:67899ca098c08a0505a1ce",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

