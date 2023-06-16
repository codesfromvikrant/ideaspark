import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const todayDate = date.toLocaleDateString("en-US", options);
const hours = new Date().getHours();
function timeContext(hours) {
  if (hours < 12) return "Morning";
  else if (hours < 17) return "Afternoon";
  else return "Evening";
}

const Intro = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { user } = state;

  return (
    <div className="flex justify-center items-center gap-2">
      <div className="">
        <div className="text-gray-600 font-bold min-w-max flex justify-start items-center gap-2">
          <p className="">Good {timeContext(hours)},</p>
          <p className="text-gray-900 font-extrabold font-lato">
            {user.username}
          </p>
        </div>

        <div className="flex justify-end items-end text-gray-600 min-w-max font-bold text-sm">
          {todayDate}
        </div>
      </div>
      <div className="bg-blue-500 font-source text-white text-2xl font-semibold w-10 h-10 rounded-full flex justify-center items-center">
        {user.username.charAt(0)}
      </div>
    </div>
  );
};

export default Intro;
