import { nanoid } from "nanoid";
import React, { useState, useContext } from "react";
import { db, doc, getDoc, setDoc } from "../firebase";
import { AppContext } from "../Contexts/AppContext";
import { toast } from "react-toastify";

const Dropdown = ({ id, moveToTrash, notetags }) => {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const addtag = async (tagname, id) => {
    try {
      if (notetags.includes(tagname)) return;
      console.log("function called");
      const updateFilteredDocs = user.filteredData.map((note) => {
        if (note.id === id) {
          note.tags = [...note.tags, tagname];
          return note;
        }
        return note;
      });
      const updateNotesData = user.notesData.map((note) => {
        if (note.id === id) {
          note.tags = [...note.tags, tagname];
          return note;
        }
        return note;
      });
      dispatch({
        type: "SET_NOTES_DATA",
        payload: updateNotesData,
      });
      dispatch({
        type: "SET_FILTERED_DATA",
        payload: updateFilteredDocs,
      });
      const docRef = doc(db, "users", user.userID);
      await setDoc(docRef, { notesdata: updateNotesData }, { merge: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const taglist = user.tags.map((tag) => {
    const added = notetags.includes(tag) ? true : false;
    const style = {
      color: added ? "#2563eb" : "#64748b",
    };
    return (
      <div
        onClick={() => {
          addtag(tag, id);
        }}
        key={nanoid()}
        className="w-full cursor-pointer hover:bg-slate-200  p-2 text-left flex justify-start items-center gap-1"
      >
        <i style={style} className="fa fa-solid fa-tag"></i>
        <p className="capitalize text-gray-700 text-xs">{tag}</p>
      </div>
    );
  });

  return (
    <div
      id={`dropdown-${id}`}
      className="bg-slate-100 border-2 border-slate-200 hidden max-w-max min-w-[8rem] rounded-md shadow-2xl absolute right-7"
    >
      <button
        onClick={() => {
          moveToTrash(id);
          toast.warn("Note Deleted Successfully");
        }}
        className="w-full hover:bg-slate-200 text-red-400 font-bold p-2 text-left"
      >
        Delete
      </button>
      <div className="min-h-max">
        <p className="px-2 text-gray-900 font-bold">Add to:</p>
        {taglist}
      </div>
    </div>
  );
};

export default Dropdown;
