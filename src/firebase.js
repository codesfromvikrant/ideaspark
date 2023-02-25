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
  apiKey: "AIzaSyBwPT2BupE2KuqEYt7qXBLN15gb82xOiF8",
  authDomain: "yournotes-9208e.firebaseapp.com",
  projectId: "yournotes-9208e",
  storageBucket: "yournotes-9208e.appspot.com",
  messagingSenderId: "29856966049",
  appId: "1:29856966049:web:120b4dd3c10a0eb61e57e0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const colRef = collection(db, "users");

// authentication
const auth = getAuth(app);

// Google Authentication
const provider = new GoogleAuthProvider();
const google = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    })
};

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  google,
  setDoc,
  getDoc,
  colRef,
  doc,
  updateDoc,
  arrayUnion
};