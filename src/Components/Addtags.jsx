import React, { useState, useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const Addtags = ({ addTagToDB }) => {
  const { state, dispatch } = useContext(AppContext);
  const { message, tag } = state;
  return (
    <>
      <div className="flex justify-start items-center gap-2 h-max">
        <input
          type="text"
          value={tag}
          onChange={(e) => {
            dispatch({ type: "SET_TAG", payload: e.target.value });
          }}
          className="w-full bg-slate-800 rounded-md py-2 shadow-md  placeholder-gray-400 font-extralight tracking-wider font-lato sm:px-4 px-3 text-gray-200 text-sm outline-none"
          placeholder="Create tag..."
        />

        <button
          onClick={() => {
            addTagToDB();
            dispatch({ type: "SET_TAG", payload: "" });
          }}
          className="bg-slate-800 hover:bg-blue-500  transition-all duration-500 shadow-md p-2 text-sm text-gray-200 rounded-md"
        >
          Add
        </button>
      </div>
      <p className="text-xs tracking-wider text-red-400">{message}</p>
    </>
  );
};

export default Addtags;
