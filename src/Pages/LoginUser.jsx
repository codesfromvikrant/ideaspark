import React, { useState } from "react";
import GoogleLogo from "../images/googlelogo.png";
import EvernoteLogo from "../images/idea_spark_logo.png";

// Routing
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useAuth } from "../Hooks/useAuth";

// Firebase
import { auth, signInWithEmailAndPassword } from "../firebase";

export default function LoginUser() {
  const navigate = useNavigate();

  const { formData, setFormData, handleInput, googleSignin } = useAuth();

  const signup = (event) => {
    event.preventDefault();
    (async function () {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        ); // user verified
        const uid = userCredential.user.uid;

        setFormData((prev) => ({
          ...prev,
          userID: uid,
          userVerified: true,
        }));
      } catch (error) {
        console.log(error.message);
      }
    })();
  };

  return (
    <>
      <form
        onSubmit={signup}
        className="max-w-xl sm:mx-auto bg-white  sm:p-10 p-6 py-10 my-16 mx-4 shadow-2xl rounded-md"
      >
        <img src={EvernoteLogo} alt="evernote_logo" className="w-40 mx-auto" />
        <div className="mt-3">
          <label htmlFor="" className="text-gray-800 font-semibold">
            Email Id :
          </label>
          <input
            value={formData.email}
            onChange={handleInput}
            name="email"
            type="email"
            className="border-gray-200 border-2 rounded py-2 px-4 w-full"
            placeholder="Enter Your Email ID"
            required
          />
        </div>

        <div className="mt-3">
          <label htmlFor="" className="text-gray-800 font-semibold">
            Password :
          </label>
          <input
            value={formData.password}
            onChange={handleInput}
            name="password"
            type="password"
            className="border-gray-200 border-2 rounded py-2 px-4 w-full"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <Link to="/signup">
          <p className="text-sm text-gray-600 mt-3">
            Create An Account?{" "}
            <span className="text-blue-500 font-medium cursor-pointer">
              Sign Up
            </span>
          </p>
        </Link>

        <div className="w-full">
          <input
            type="submit"
            value="Log In"
            className="bg-blue-500 text-white font-semibold w-full py-3 px-6 rounded mt-3 cursor-pointer hover:shadow-2xl"
          />
        </div>
        <div
          onClick={googleSignin}
          className="bg-gray-100 shadow-md w-full font-semibold py-3 rounded mt-2  flex justify-center items-center gap-3 cursor-pointer"
        >
          <img src={GoogleLogo} className="w-6" alt="Google-Logo" />
          <p>Login Via Google</p>
        </div>
      </form>
    </>
  );
}
