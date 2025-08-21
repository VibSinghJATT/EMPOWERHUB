// firebase.js — central Firebase initialization & exports

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// 🔴 Replace with YOUR Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyA6Cp7n7htp9pAYQRl_okU4DnvEyveaG88",
  authDomain: "empowerhub-1.firebaseapp.com",
  projectId: "empowerhub-1",
  storageBucket: "empowerhub-1.firebasestorage.app",
  messagingSenderId: "450780788629",
  appId: "1:450780788629:web:8498e92418af318e2ba89c",
  measurementId: "G-03T9XG2C69"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Re-exports for use in other files
export {
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  query,
  where
};
