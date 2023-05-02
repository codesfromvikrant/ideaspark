import React from "react";
// images
import DashboardImg from "../../images/bg_slides/slide2.jpg";
// Components
import Notescollec from "../Notescollec";
import Scratchpad from "../Scratchpad";
import SearchBar from "../SearchBar";
import { useAuth } from "../../Hooks/useAuth";

const Dashboard = ({ userData }) => {
  //console.log(userData);
  const style = {
    background: `url(${DashboardImg})`,
    backgroundPosition: "down",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const todayDate = `${day[date.getDay()]}, ${date.getDate()}, ${
    month[date.getMonth()]
  }, ${date.getFullYear()}`;

  return (
    <div className="w-full h-[100vh] bg-gray-200 overflow-y-scroll ">
      <div className="w-full h-[25rem] z-0 py-6" style={style}>
        <div className="flex justify-start sm:items-center items-start  flex-wrap gap-4 w-[90%] mx-auto">
          <div className="bg-white min-w-max sm:px-10 px-6 py-3 rounded-full shadow-md">
            <p className="text-gray-600 font-bold">Good Morning 🌅🌄</p>
          </div>

          <div className="text-white min-w-max shadow-2xl bg-gray-900 sm:px-10 px-6 py-3 rounded-full font-medium text-base">
            {todayDate}
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 w-[90%] mx-auto">
          <SearchBar />
        </div>

        <div className="flex justify-start items-center gap-4 sm:w-[90%] mx-auto  z-50 h-max">
          <Notescollec />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
