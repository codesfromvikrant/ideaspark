import React from "react";
// Images
import EvernoteLogo from '../../images/evernote.png'
// Components
import SearchBar from "../SearchBar";
import Newnote from "../Addnote";
// Routing 
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import useFirestore from "../../Hooks/useFirestore";

const Sidepanel = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <aside className="w-[18%] px-4 h-[100vh] overflow-y-auto bg-gray-900 ">
      <div className="w-full h-full mx-auto my-6 relative">
        <div className="logo flex justify-start items-center gap-3">
          <img src={EvernoteLogo} className="w-10" />
          <p className="text-gray-300 text-xl tracking-wide font-semibold">Evernote</p>
        </div>
        <SearchBar />
        <Newnote />

        <div onClick={() => { navigate(`/user/${userId}`) }} className="home flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa fa-solid fa-house"></i>
          <p>Home</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa-solid fa-note-sticky"></i>
          <p>Notes</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Tasks</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa fa-solid fa-tag"></i>
          <p>Tags</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa fa-solid fa-trash"></i>
          <p>Trash</p>
        </div>


        <button className="text-white bg-gray-800 w-full p-2 rounded absolute ">Log Out</button>
      </div>


    </aside>
  )
}

export default Sidepanel;