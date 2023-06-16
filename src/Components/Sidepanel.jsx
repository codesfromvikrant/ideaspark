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
      className="min-w-[13rem] px-4 min-h-[100vh] overflow-y-auto bg-slate-900 font-lato md:static fixed md:block hidden z-50"
    >
      <div className="w-full h-full mx-auto my-6 relative">
        <div className="logo flex justify-between items-center gap-3 mb-10">
          <p className="font-source text-2xl font-extrabold text-blue-500 tracking-wide">
            Ideas<span className="font-medium text-white">Spark</span>
          </p>
          <i className="fa-solid fa-bars text-white text-lg"></i>
        </div>

        <div
          onClick={() => {
            navigate(`/user/${user.userId}`);
          }}
          className="home flex justify-start items-center gap-3 text-white hover:bg-slate-800 hover:px-4 hover:py-3 hover:text-white hover:font-semibold transition-all duration-500 rounded-md  font-medium my-4 cursor-pointer"
        >
          <i className="fa fa-solid fa-house"></i>
          <p>Home</p>
        </div>

        <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md">
          <div className="flex justify-start items-center gap-3 text-white font-semibold cursor-pointer ">
            <i className="fa-solid fa-note-sticky"></i>
            <p className="text-sm">All Docs</p>
          </div>
          <i className="fa-solid fa-caret-right text-white"></i>
        </div>

        <div className="flex justify-start items-center gap-3 text-white font-semibold my-4 cursor-pointer ">
          <i className="fa-solid fa-list-check"></i>
          <p className="text-sm">To Do Tasks</p>
        </div>

        <div
          onClick={() => dispatch({ type: "SET_TAG_DIALOG", payload: true })}
          className="flex justify-between items-center mb-2 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <div className="flex justify-start items-center gap-3 text-white font-semibold cursor-pointer ">
            <i className="fa fa-solid fa-tag text-white"></i>
            <p className="text-sm">Add Tags</p>
          </div>
          <i className="fa-solid fa-caret-right text-white"></i>
        </div>

        <div
          onClick={() => {
            filtering("trash", true);
          }}
          className="flex justify-start items-center gap-3 text-white font-semibold my-4 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <i className="fa fa-solid fa-trash"></i>
          <p className="text-sm">Trash</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidepanel;
