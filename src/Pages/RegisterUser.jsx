import React, { useState } from "react";
import GoogleLogo from "../images/googlelogo.png";
import EvernoteLogo from "../images/idea_spark_logo.png";
import { Link } from "react-router-dom";

// Routing
import { useNavigate } from "react-router-dom";

// Firebase
import {
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  colRef,
  db,
  doc,
} from "../firebase";

// Hooks
import { useAuth } from "../Hooks/useAuth";

export default function RegisterUser() {
  const navigate = useNavigate();

  const [passmatch, setPassMatch] = useState("");
  const { formData, setFormData, handleInput, googleSignin } = useAuth();

  const signup = (event) => {
    event.preventDefault();
    (async function () {
      if (formData.password === formData.confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
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

          setDoc(doc(db, "users", uid), {
            username: formData.username,
            email: formData.email,
            notesdata: [],
            tags: [],
            trash: [],
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setPassMatch("Password Does Not Match");
      }
    })();
  };

  return (
    <>
      <form
        onSubmit={signup}
        className="max-w-xl sm:mx-auto mx-4 bg-white  sm:p-10 p-4 py-10 my-16 shadow-2xl rounded-md"
      >
        <img src={EvernoteLogo} alt="" className="w-40 mx-auto" />
        <div className="mt-3">
          <label htmlFor="" className="text-gray-800 font-semibold">
            User Name :
          </label>
          <input
            value={formData.username}
            onChange={handleInput}
            name="username"
            type="text"
            className="border-gray-200 border-2 rounded py-2 px-4 w-full"
            placeholder="Enter Your User Name"
            required
          />
        </div>

        <div className="mt-3">
          <label htmlFor="" className="text-gray-800 font-semibold">
            Email ID :
          </label>
          <input
            value={formData.email}
            onChange={handleInput}
            name="email"
            type="text"
            className="border-gray-200 border-2 rounded py-2 px-4 w-full"
            placeholder="Enter Your Full Name"
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
            placeholder="Enter Your Full Name"
            required
          />
        </div>

        <div className="mt-3">
          <label htmlFor="" className="text-gray-800 font-semibold">
            Confirm Password :
          </label>
          <input
            value={formData.confirmPassword}
            onChange={handleInput}
            name="confirmPassword"
            type="password"
            className="border-gray-200 border-2 rounded py-2 px-4 w-full"
            placeholder="Enter Your Full Name"
            required
          />
          <p className="text-red-500 text-sm">{passmatch}</p>
        </div>

        <Link to="/login">
          <p className="text-sm text-gray-600 mt-3">
            Already Registered?{" "}
            <span className="text-blue-500 font-medium cursor-pointer">
              Log In
            </span>
          </p>
        </Link>

        <div className="bg-blue-600 text-white font-semibold w-full py-3 px-6 rounded mt-3">
          <input type="submit" value="Sign Up" className="w-full" />
        </div>
        <div
          onClick={googleSignin}
          className="bg-gray-100 shadow-md w-full font-semibold py-3 rounded mt-2 flex justify-center items-center gap-3 cursor-pointer"
        >
          <img src={GoogleLogo} className="w-6" alt="Google-Logo" />
          <p>SignUp Via Google</p>
        </div>
      </form>
    </>
  );
}
