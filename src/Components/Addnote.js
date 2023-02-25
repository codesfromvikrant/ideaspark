import React from "react";
import { useNavigate } from "react-router";
// NanoID
import { nanoid } from "nanoid";


const Newnote = () => {
  const noteID = nanoid();

  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => { navigate(`./n/${noteID}`) }} className="text-white bg-green-600 w-full p-2 rounded">New Note</button>
    </>
  )
}

export default Newnote;