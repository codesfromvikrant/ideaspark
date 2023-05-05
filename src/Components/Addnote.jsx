import React from "react";
import { useNavigate } from "react-router";
// NanoID
import { nanoid } from "nanoid";

const Newnote = () => {
  const noteID = nanoid();

  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(`./n/${noteID}`);
        }}
        className="text-gray-900 hover:text-white bg-white hover:bg-blue-600 transition-all duration-500 w-full p-2 my-4 rounded-md font-semibold"
      >
        New Note
      </button>
    </>
  );
};

export default Newnote;
