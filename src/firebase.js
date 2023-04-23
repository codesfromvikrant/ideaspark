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
  signInWithPopup,
  GoogleAuthProvider,
  provider,
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