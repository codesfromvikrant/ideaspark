import React, { useState } from "react";
// Firebase 
import { google, setDoc, getDoc, colRef, doc } from '../firebase'


const useFirestore = (userID) => {

  const initialAuth = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    notesData: [],
    userVerified: false
  }
  const [authInput, setAuthInput] = useState(initialAuth);
  const [userData, setUserData] = useState('');

  // Handle Form Inputs
  const handleInput = (event) => {
    const { name, value } = event.target
    event.preventDefault();
    setAuthInput(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }


  // Get the Data
  if (userID) {
    getDoc(doc(colRef, userID))
      .then((snap) => {
        setUserData(snap.data())
      })
      .catch((error) => { console.log(error) })
  }


  // Google SignUp & SignIn
  const googleHandler = () => {
    google();
  }


  return [userData, authInput, setAuthInput, handleInput, googleHandler];
}



export { useFirestore };