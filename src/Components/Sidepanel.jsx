import React, { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

const Sidepanel = ({ SidepanelOpen, setFilterTag }) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, tag } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const noteID = nanoid();

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
            navigate(`./n/${noteID}`);
          }}
          className="flex justify-start items-center gap-3 text-white bg-slate-800 hover:bg-blue-500 transition-all duration-750 px-4 py-3 font-semibold text-sm rounded-md  my-4 cursor-pointer"
        >
          <i className="fa-sharp fa-solid fa-file text-white"></i>
          <p>Add Note</p>
        </div>

        <div
          onClick={() => {
            navigate(`/user/${user.userId}`);
          }}
          className="flex justify-start items-center gap-3 text-white font-semibold cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <i className="fa-solid fa-note-sticky"></i>
          <p className="text-sm">All Docs</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-white font-semibold hover:bg-slate-800 hover:px-4 hover:py-3 hover:text-white hover:font-semibold transition-all duration-500 my-4 cursor-pointer rounded-md">
          <i className="fa-solid fa-phone"></i>
          <p className="text-sm">Contact Us</p>
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

        <div className="flex justify-start items-center gap-3 text-white font-semibold my-4 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md">
          <i className="fa-solid fa-right-from-bracket"></i>
          <p className="text-sm">Log Out</p>
        </div>
      </div>

      <div className="text-gray-300">
        <p className="text-xs font-extralight">Developed By</p>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium"> Vikrant Kumar</p>
          <div className="flex justify-start items-center gap-3">
            <i
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/vikrant-kumar-1b1b3b1b5/"
                );
              }}
              className="fa-brands fa-linkedin cursor-pointer"
            ></i>
            <i
              onClick={() => {
                window.open("https://github.com/codesfromvikrant");
              }}
              className="fa-brands fa-github cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidepanel;
