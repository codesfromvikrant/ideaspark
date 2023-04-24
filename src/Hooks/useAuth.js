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
    notesData: [],
    userVerified: false
  }

  const [userData, setUserData] = useState(temp);

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log(userData.userVerified)


  useEffect(() => {
    if (userData.userVerified) {
      const docRef = doc(db, "users", userData.userID);

      getDoc(docRef).then((docs) => {
        if (docs.exists()) {
          console.log(docs.data());
          setUserData(prev => ({
            ...prev,
            notesData: docs.data().notesdata
          }));
        } else {
          setDoc(doc(db, "users", userData.userID), {
            username: userData.username,
            email: userData.email,
            notesdata: userData.notesData,
          });
        }

        navigate(`/user/${userData.userID}`);
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

    }
  }, [userData]);

  const googleSignin = () => {
    (async function () {
      try {
        const userCredential = await signInWithPopup(auth, provider)
        const { displayName, email, photoURL } = userCredential.user;

        setUserData(prev => ({
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

  return { userData, setUserData, handleInput, googleSignin };
}