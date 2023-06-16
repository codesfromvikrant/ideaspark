import React from "react";
import { useNavigate } from "react-router";
// NanoID
import { nanoid } from "nanoid";

const AddNote = () => {
  const noteID = nanoid();

  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(`./n/${noteID}`);
        }}
        className="text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 transition-all duration-750 py-2 px-4 rounded shadow"
      >
        Add New Note{"  "}
        <i className="fa-sharp fa-solid fa-file text-white"></i>
      </button>
    </>
  );
};

export default AddNote;
