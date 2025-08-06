// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAOGpeOT1yAGGPZbfd3Gx0TNwNQvAhZLY",
  authDomain: "shopwise-bb399.firebaseapp.com",
  projectId: "shopwise-bb399",
  storageBucket: "shopwise-bb399.firebasestorage.app",
  messagingSenderId: "1089054386694",
  appId: "1:1089054386694:web:7bb69a4170dc93cc9ab187",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);

// Firebase order database
export const db = getFirestore(app);

