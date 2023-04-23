import React, { useState } from "react";

import {
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
} from '../firebase'

export const useAuth = (userID) => {
  const temp = {
    userID: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    notesData: [],
    userVerified: false
  }

  const [userData, setUserData] = useState(temp);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const googleAuthHandle = () => {
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

  return { userData, setUserData, handleInput, googleAuthHandle };
}