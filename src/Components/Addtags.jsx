import React, { useState } from "react";

const Addtags = ({ addTag, addTagToDB, message, setMessage, setAddTag }) => {
  return (
    <>
      <div className="flex justify-start items-center gap-2 h-max">
        <input
          type="text"
          value={addTag}
          onChange={(e) => {
            setMessage("");
            setAddTag(e.target.value);
          }}
          className="w-full bg-slate-800 rounded-md py-2 shadow-md  placeholder-gray-400 font-extralight tracking-wider font-lato sm:px-4 px-3 text-gray-200 text-sm outline-none"
          placeholder="Create tag..."
        />

        <button
          onClick={() => {
            addTagToDB();
            setAddTag("");
          }}
          className="bg-slate-800 hover:bg-slate-900 transition-all duration-500 shadow-md p-2 text-sm text-gray-200 rounded-md"
        >
          Add
        </button>
      </div>
      <p className="text-xs tracking-wider text-red-400">{message}</p>
    </>
  );
};

export default Addtags;
