import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBENMV3FWfVL-R00xQSqxZuOOuG1mvMzm8",
  authDomain: "quell-blog.firebaseapp.com",
  projectId: "quell-blog",
  storageBucket: "quell-blog.appspot.com",
  messagingSenderId: "168610704627",
  appId: "1:168610704627:web:f42f77ca2731bc45479b86",
  measurementId: "G-TK49GYS3E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app); // Export Firestore
export const storage = getStorage(app); // Export Storage
export const auth = getAuth(app); // Export Authentication
