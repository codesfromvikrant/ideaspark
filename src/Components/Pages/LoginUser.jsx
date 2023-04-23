import React, { useState } from "react";
import GoogleLogo from '../../images/googlelogo.png'
import EvernoteLogo from '../../images/evernote_logo.svg'

// Routing
import { Link, useNavigate } from 'react-router-dom'

// Hooks 
//import { useFirestore } from '../../Hooks/useFirestore';
import { useAuth } from "../../Hooks/useAuth";

// Firebase
import {
  auth,
  signInWithEmailAndPassword
} from '../../firebase'

export default function LoginUser() {

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const { userData, setUserData, handleInput, googleAuthHandle } = useAuth(id);
  console.log(userData)

  const signup = (event) => {
    event.preventDefault();
    (async function () {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)  // user verified
        const uid = userCredential.user.uid;
        setId(uid);

        setUserData(prev => ({
          ...prev,
          userID: uid,
          userVerified: true
        }));

        navigate(`/user/${uid}`)
      } catch (error) {
        console.log(error.message)
      }
    })();
  }

  /*
  let userID;
  const [userData, authInput, setAuthInput, handleInput, googleHandler] = useFirestore(userID);

  const loginSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, authInput.email, authInput.password)
      .then((userCredential) => {
        userID = userCredential.user.uid;
        // User Verified
        setAuthInput(prevInput => ({
          ...prevInput,
          userVerified: true
        }));

        navigate(`/user/${userID}`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }*/


  return (
    <>
      <form onSubmit={signup} className="w-1/3 mx-auto bg-white border-2 border-gray-200 p-10 mt-16 rounded-md">
        <img src={EvernoteLogo} alt="evernote_logo" />
        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Email Id :
          </label>
          <input value={userData.email} onChange={handleInput} name='email' type="email" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Email ID' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Password :
          </label>
          <input value={userData.password} onChange={handleInput} name='password' type="password" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Password' required />
        </div>

        <Link to="/signup">
          <p className='text-sm text-gray-600 mt-3'>Create An Account? <span className='text-blue-500 font-medium cursor-pointer'>Sign Up</span></p>
        </Link>

        <div className='w-full'>
          <input type="submit" value='Log In' className='bg-blue-600 text-white font-semibold w-full py-3 px-6 rounded mt-3 cursor-pointer hover:shadow-2xl' />
        </div>
        <div onClick={googleAuthHandle} className="bg-gray-100 shadow-md w-full font-semibold py-3 rounded mt-2  flex justify-center items-center gap-3 cursor-pointer">
          <img src={GoogleLogo} className="w-6" alt="Google-Logo" />
          <p>Login Via Google</p>
        </div>

      </form>
    </>
  )
}