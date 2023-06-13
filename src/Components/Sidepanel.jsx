import React, { useState, useEffect, useContext } from "react";
import EvernoteLogo from "../images/idea_spark_logo.png";
import Newnote from "./Addnote";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

const Sidepanel = ({ SidepanelOpen, setFilterTag }) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, tag } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function filtering(key, value) {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  }

  const styles = {
    display: SidepanelOpen ? "block" : "none",
  };
  return (
    <aside
      style={styles}
      className="min-w-[13rem] px-4 min-h-[100vh] overflow-y-scroll bg-gray-900 font-lato md:static fixed md:block hidden z-50"
    >
      <div className="w-full h-full mx-auto my-6 relative">
        <div className="logo flex justify-start items-center gap-3 mb-4">
          <img src={EvernoteLogo} className="w-24 mx-auto" />
        </div>
        <Newnote />

        <div
          onClick={() => {
            navigate(`/user/${user.userId}`);
          }}
          className="home flex justify-start items-center gap-3 text-gray-300 hover:bg-slate-800 hover:px-4 hover:py-3 hover:text-white hover:font-semibold transition-all duration-500 rounded-md  font-medium my-4 cursor-pointer"
        >
          <i className="fa fa-solid fa-house"></i>
          <p>Home</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer ">
          <i className="fa-solid fa-note-sticky"></i>
          <p>Docs</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer ">
          <i className="fa-solid fa-list"></i>
          <p>Tasks</p>
        </div>

        <div
          onClick={() => dispatch({ type: "SET_TAG_DIALOG", payload: true })}
          className="flex justify-between items-center mb-2 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <div className="flex justify-start items-center gap-3 text-gray-300 font-medium cursor-pointer ">
            <i className="fa fa-solid fa-tag text-gray-300"></i>
            <p>Tags</p>
          </div>
          <i className="fa-solid fa-caret-right text-gray-200"></i>
        </div>

        <div
          onClick={() => {
            filtering("trash", true);
          }}
          className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <i className="fa fa-solid fa-trash"></i>
          <p>Trash</p>
        </div>
      </div>

      <button className="text-white bg-slate-800 font-semibold w-full hover:bg-blue-600 transition-all duration-500 p-2 rounded-md">
        Log Out
      </button>
    </aside>
  );
};

export default Sidepanel;
