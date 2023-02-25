import React from "react";
// images
import DashboardImg from '../../images/dashboard_img.png'
// Components
import Notescollec from "../Notescollec";
import Scratchpad from "../Scratchpad";

const Dashboard = () => {

  const style = {
    background: `url(${DashboardImg})`,
    backgroundPosition: "down",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }

  const date = new Date();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayDate = `${day[date.getDay()]}, ${date.getDate()}, ${month[date.getMonth()]}, ${date.getFullYear()}`

  return (
    <div className="w-full h-[100vh] bg-gray-200 overflow-y-scroll ">
      <div className="w-full h-[25rem] z-0 px-12 py-6 relative" style={style}>
        <div className="bg-white w-max px-10 py-3 rounded-full shadow-md mb-6">
          <p className="text-gray-600 font-bold">Good Morning, Vikrant</p>
        </div>

        <div className="text-white font-bold text-lg absolute right-12 top-8">{todayDate}</div>

        <Scratchpad />
      </div>

      <div className="flex justify-start items-center gap-4 w-[92%] mx-auto -mt-12 z-50 h-max">
        <Notescollec />
      </div>

    </div>
  )
}

export default Dashboard;