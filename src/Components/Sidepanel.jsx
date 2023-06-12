import React, { useState, useEffect, useContext } from "react";
import EvernoteLogo from "../images/idea_spark_logo.png";
import Newnote from "./Addnote";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../firebase";
import Addtags from "./Addtags";
import { nanoid } from "nanoid";
import { AppContext } from "../Contexts/AppContext";

const Sidepanel = ({ SidepanelOpen, setFilterTag }) => {
  const { state, dispatch } = useContext(AppContext);
  const { user, message, tag } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function filtering(key, value) {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  }

  const addTagToDB = async () => {
    try {
      const tagadded = false;
      user.tags.forEach((el) => {
        if (el.tagname.toLowerCase() === tag.toLowerCase()) {
          dispatch({ type: "SET_MESSAGE", payload: "Tag already exists" });
          tagadded = true;
        }
      });
      if (tagadded === true || tag === "") return;
      const docRef = doc(db, "users", user.userID);
      const prevTags = user.tags;
      const newTags = [
        ...prevTags,
        { id: nanoid(), tagname: tag, docscount: 0 },
      ];
      dispatch({ type: "SET_TAGS", payload: newTags });
      await setDoc(docRef, { tags: newTags }, { merge: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTagFromDB = async (id) => {
    const prevTags = user.tags;
    const newTags = prevTags.filter((el) => {
      return el.id != id;
    });
    dispatch({ type: "SET_TAGS", payload: newTags });
  };

  const tagList = user.tags.map((tag) => {
    return (
      <div
        key={tag.id}
        className="flex justify-between items-center gap-3 text-gray-300 pl-4 py-1"
      >
        <p
          onClick={() => {
            filtering("tag", tag.tagname);
          }}
          className="cursor-pointer text-gray-400 text-sm hover:text-blue-500 capitalize"
        >
          {tag.tagname}
        </p>
        <div className="flex justify-end items-center gap-2">
          <div className="bg-slate-800 rounded text-xs text-gray-400 py-1 px-2 font-semibold flex justify-center items-center">
            {tag.docscount}
          </div>
          <i
            onClick={() => deleteTagFromDB(tag.id)}
            className="fa-solid fa-trash text-gray-100 cursor-pointer hover:text-red-500 transition-all duration-750"
          ></i>
        </div>
      </div>
    );
  });

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

        <div className="flex justify-between items-center mb-2 cursor-pointer">
          <div className="flex justify-start items-center gap-3 text-gray-300 font-medium cursor-pointer ">
            <i className="fa fa-solid fa-tag"></i>
            <p>Tags</p>
          </div>
          <i className="fa-solid fa-caret-down text-white"></i>
        </div>
        <div className="my-2">{tagList}</div>

        <Addtags addTagToDB={addTagToDB} />

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
