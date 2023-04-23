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
import { useAuth } from '../../Hooks/useAuth'

export default function RegisterUser() {

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [passmatch, setPassMatch] = useState('');
  const { userData, setUserData, handleInput, googleAuthHandle } = useAuth(id);

  const signup = (event) => {
    event.preventDefault();
    (async function () {
      if (userData.password === userData.confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)  // user verified
          const uid = userCredential.user.uid;
          setId(uid);

          setUserData(prev => ({
            ...prev,
            userID: uid,
            userVerified: true
          }));

          setDoc(doc(colRef, uid), {
            username: userData.username,
            email: userData.email,
            notesdata: userData.notesData
          });

          navigate(`/user/${uid}`)
        } catch (error) {
          console.log(error.message)
        }
      } else {
        setPassMatch('Password Does Not Match')
      }
    })();
  }


  return (
    <>
      <form onSubmit={signup} className='w-1/3 mx-auto bg-white border-2 border-gray-200 p-10 mt-16 rounded-md'>
        <img src={EvernoteLogo} alt="" />
        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            User Name :
          </label>
          <input value={userData.username} onChange={handleInput} name='username' type="text" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your User Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Email ID :
          </label>
          <input value={userData.email} onChange={handleInput} name='email' type="text" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Password :
          </label>
          <input value={userData.password} onChange={handleInput} name='password' type="password" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
        </div>

        <div className="mt-3">
          <label htmlFor="" className='text-gray-800 font-semibold'>
            Confirm Password :
          </label>
          <input value={userData.confirmPassword} onChange={handleInput} name='confirmPassword' type="password" className='border-gray-200 border-2 rounded py-2 px-4 w-full' placeholder='Enter Your Full Name' required />
          <p className='text-red-500 text-sm'>{passmatch}</p>
        </div>

        <Link to="/login">
          <p className='text-sm text-gray-600 mt-3'>Already Registered? <span className='text-blue-500 font-medium cursor-pointer'>Log In</span></p>
        </Link>


        <div className='bg-blue-600 text-white font-semibold w-full py-3 px-6 rounded mt-3'>
          <input type="submit" value='Sign Up' className='w-full' />
        </div>
        <div onClick={googleAuthHandle} className="bg-gray-100 shadow-md w-full font-semibold py-3 rounded mt-2 flex justify-center items-center gap-3 cursor-pointer">
          <img src={GoogleLogo} className="w-6" alt="Google-Logo" />
          <p>SignUp Via Google</p></div>
      </form>
    </>
  )
}
