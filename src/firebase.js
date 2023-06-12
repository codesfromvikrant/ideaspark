import { initializeApp } from "firebase/app";

// Firestore
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

// Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAs29XWrJoeb82DrGP0t1BbWqk3_dA6PL0",
  authDomain: "keep-clone-75661.firebaseapp.com",
  projectId: "keep-clone-75661",
  storageBucket: "keep-clone-75661.appspot.com",
  messagingSenderId: "882826165769",
  appId: "1:882826165769:web:8bd79dca0eabfc486bc2d8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "users");

// authentication
const auth = getAuth(app);

// Google Authentication
const provider = new GoogleAuthProvider();

export {
  auth,
  signInWithPopup,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDoc,
  colRef,
  doc,
  db,
  updateDoc,
  arrayUnion
};  