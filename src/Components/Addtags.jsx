import React, { useState, useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const Addtags = ({ addTagToDB }) => {
  const { state, dispatch } = useContext(AppContext);
  const { message, tag } = state;
  return (
    <>
      <div className="flex justify-between items-center gap-1 w-full bg-gray-300 rounded-md py-2 shadow font-lato px-3">
        <input
          type="text"
          value={tag}
          onChange={(e) => {
            dispatch({ type: "SET_TAG", payload: e.target.value });
          }}
          className="bg-transparent placeholder-gray-500 text-gray-800 font-semibold text-sm outline-none"
          placeholder="Add tag..."
        />
        <div className=" w-max">
          <i
            onClick={() => {
              addTagToDB();
              dispatch({ type: "SET_TAG", payload: "" });
            }}
            className="fa-solid fa-plus text-lg text-blue-500"
          ></i>
        </div>
      </div>

      <p className="text-xs tracking-wider text-red-400">{message}</p>
    </>
  );
};

export default Addtags;
