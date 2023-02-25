import React, { useState } from "react";
//Components
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Header from "../Header";
// Images
import HeroImage from '../../images/heroimage.png'
// Routing
import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-5xl text-center mx-auto mt-16">
          <h3 className="text-6xl font-semibold">Tame your work, organize your life</h3>
          <p className="text-2xl my-8">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
          <Link to="/signup">
            <button className="bg-green-600 text-white font-medium py-4 px-16 rounded">Sign Up for Free</button>
          </Link>
          <br />
          <a href="" className="text-base font-medium underline">Already Have an Account? Log In</a>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-16">
          <div className="w-full col-span-3"><img src={HeroImage} className="w-full" alt="" /></div>
          <div className="">
            <div className="">
              <h4 className="font-bold text-xl">WORK ANYWHERE</h4>
              <p className="text-lg">Keep important info handy—your notes sync automatically to all your devices.</p>
            </div><br />

            <div className="">
              <h4 className="font-bold text-xl">REMEMBER EVERYTHING</h4>
              <p className="text-lg">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
            </div><br />

            <div className="">
              <h4 className="font-bold text-xl">TURN TO-DO INTO DONE</h4>
              <p className="text-lg">Bring your notes, tasks, and schedules together to get things done more easily.</p>
            </div><br />

            <div className="">
              <h4 className="font-bold text-xl">FIND THINGS FAST</h4>
              <p className="text-lg">Get what you need, when you need it with powerful, flexible search capabilities.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;