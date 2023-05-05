import React, { useState } from "react";
import { PassDataContext } from "../Contexts/PassData";
import DashboardImg from "../images/bg_slides/slide2.jpg";
// Components
import Docscollec from "../Components/Docscollec";
import Scratchpad from "../Components/Scratchpad";
import SearchBar from "../Components/SearchBar";
import { useOutletContext } from "react-router-dom";
import "lazysizes";
import { getDoc, doc, colRef } from "../firebase";

const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const todayDate = date.toLocaleDateString("en-US", options);

const Dashboard = () => {
  const { userData, filterTag, setFilterTag } = useOutletContext();

  const style = {
    background: `url(${DashboardImg})`,
    backgroundPosition: "down",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full h-[100vh] bg-gray-200 overflow-y-scroll ">
      <div
        className="lazyload w-full h-[25rem] z-0 py-6"
        data-bg={DashboardImg}
        style={style}
      >
        <div className="flex justify-start sm:items-center items-start  flex-wrap gap-4 w-[90%] mx-auto">
          <div className="bg-white text-gray-600 font-bold min-w-max sm:px-10 px-4 py-3 rounded-md shadow-md flex justify-start items-center gap-2">
            <p className="">Good Morning 🌄 </p>
            <p className="text-gray-900 font-extrabold font-lato">
              {userData.username} 😎
            </p>
          </div>

          <div className="text-white min-w-max shadow-2xl bg-gray-900 sm:px-10 px-6 py-3 rounded-md font-medium text-base">
            {todayDate}
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 sm:w-[90%] mx-auto z-50 h-max">
          <PassDataContext.Provider
            value={{ userData, filterTag, setFilterTag }}
          >
            <Docscollec />
          </PassDataContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;