import React, { useState } from 'react'
import GoogleLogo from '../../images/googlelogo.png'
import EvernoteLogo from '../../images/evernote_logo.svg'
import { Link } from 'react-router-dom'

// Routing
import { useNavigate } from 'react-router-dom'

// Firebase
import {
  auth,
  createUserWithEmailAndPassword, setDoc, colRef, doc
} from '../../firebase'

// Hooks 
import { useFirestore } from '../../Hooks/useFirestore';

export default function RegisterUser() {

  const navigate = useNavigate();
  let userID;
  const [userData, authInput, setAuthInput, handleInput, googleHandler] = useFirestore(userID);

  const registrationSubmit = (event) => {
    event.preventDefault()
    if (authInput.password === authInput.confirmPassword) {
      createUserWithEmailAndPassword(auth, authInput.email, authInput.password)
        .then((userCredential) => {

          userID = userCredential.user.uid;
          console.log(userID)
          // user verified
          setAuthInput(prevInput => ({
            ...prevInput,
            userVerified: true
          }))
          // creating Doc for each user in Firestore
          setDoc(doc(colRef, userID), {
            // add your document data here
            username: authInput.username,
            email: authInput.email,
            notesdata: authInput.notesData
          })
            .then(() => {
              console.log(`New document with ID ${userID} added successfully!`);
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });

          navigate(`/user/${userID}`)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage)
        });
    }
  }


  return (
    <>
      <form onSubmit={registrationSubmit} className='w-1/3 mx-auto bg-white border-2 border-gray-200 p-10 mt-16 rounded-md'>
        <img src={EvernoteLogo} alt="" />
        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            User Name :
          </label>
          <input value={authInput.username} onChange={handleInput} name='username' type="text" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your User Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Email ID :
          </label>
          <input value={authInput.email} onChange={handleInput} name='email' type="text" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Password :
          </label>
          <input value={authInput.password} onChange={handleInput} name='password' type="password" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Confirm Password :
          </label>
          <input value={authInput.confirmPassword} onChange={handleInput} name='confirmPassword' type="password" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
        </div>

        <Link to="/login">
          <p className='text-sm text-gray-600 mt-3'>Already Registered? <span className='text-blue-500 font-medium cursor-pointer'>Log In</span></p>
        </Link>


        <div className='bg-blue-600 text-white font-semibold w-full py-3 px-6 rounded mt-3'>
          <input type="submit" value='Sign Up' className='w-full' />
        </div>
        <div onClick={googleHandler} className="bg-gray-100 shadow-md w-full font-semibold py-3 rounded mt-2 flex justify-center items-center gap-3 cursor-pointer">
          <img src={GoogleLogo} className="w-6" alt="Google-Logo" />
          <p>SignUp Via Google</p></div>
      </form>
    </>
  )
}
