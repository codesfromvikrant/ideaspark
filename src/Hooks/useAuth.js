import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  auth,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
  db,
  doc,
  getDoc,
  setDoc
} from '../firebase'

export const useAuth = () => {
  const temp = {
    userID: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    scratchpad: '',
    notesData: [],
    userVerified: false
  }

  const [formData, setFormData] = useState(temp);

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // console.log(formData.userVerified)

  useEffect(() => {
    if (!formData.userVerified) return;
    const docRef = doc(db, "users", formData.userID);
    getDoc(docRef).then((docs) => {
      if (!docs.exists()) {
        setDoc(doc(db, "users", formData.userID), {
          username: formData.username,
          email: formData.email,
          notesdata: [],
          tags: [],
          trash: [],
        });
      }
      sessionStorage.setItem('userId', formData.userID);
      sessionStorage.setItem('userVerified', formData.userVerified);
      navigate(`/user/${formData.userID}`);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [formData]);

  const googleSignin = () => {
    (async function () {
      try {
        const userCredential = await signInWithPopup(auth, provider)
        const { displayName, email, photoURL } = userCredential.user;

        setFormData(prev => ({
          ...prev,
          userID: userCredential.user.uid,
          username: displayName,
          email: email,
          userVerified: true
        }))

      } catch (error) {
        console.log(error.message);
      }
    })();
  };

  return { formData, setFormData, handleInput, googleSignin };
}