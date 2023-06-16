import React, { useState, useEffect, useContext, useMemo } from "react";
import { getDoc, doc, colRef, updateDoc } from "../firebase";
import { Link, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";
import Menu from "./Menu";
import AddNote from "./Addnote";
import Filters from "./Filters";
import { AppContext } from "../Contexts/AppContext";

const Notescollec = () => {
  const { state, dispatch } = useContext(AppContext);
  const { user, loading, docsPerPage } = state;

  const [searchParams, setSearchParams] = useSearchParams();
  const trash = searchParams.get("trash");
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;

  const openDialog = (id) => {
    const dialog = document.querySelector(`#dropdown-${id}`);
    dialog.classList.toggle("hidden");
  };

  // Move the doc to trash
  const moveToTrash = (id) => {
    const newDocs = user.filteredData.map((obj) => {
      if (obj.id === id) {
        const prevTrash = user.trash;
        dispatch({ type: "SET_TRASH", payload: [...prevTrash, obj] });
        const updateDocs = user.filteredData.filter((obj) => obj.id !== id);
        dispatch({ type: "SET_FILTERED_DATA", payload: updateDocs });
        dispatch({ type: "SET_NOTES_DATA", payload: updateDocs });
        updateDoc(doc(colRef, user.userID), {
          notesdata: updateDocs,
          trash: [...prevTrash, obj],
        });
      }
      return obj;
    });
  };

  const Docs = user.filteredData.map((obj, i) => {
    // conditions for pagination
    let startDocs = (page - 1) * docsPerPage;
    let endDocs = page * docsPerPage;
    if (endDocs > user.notesData.length) endDocs = user.notesData.length;
    if (i < startDocs || i >= endDocs) return null;

    const content = obj.content;
    return (
      <div
        key={obj.id}
        className="cursor-pointer h-[15rem] p-4 rounded shadow-md relative text-sm bg-white text-gray-900 overflow-hidden"
      >
        {/* <Menu openDialog={openDialog} id={obj.id} /> */}
        {/* <Dropdown id={obj.id} moveToTrash={moveToTrash} notetags={obj.tags} /> */}
        <Link to={`/user/${user.userID}/n/${obj.id}`}>
          <p className="font-bold text-base hover:text-blue-600 transition-all">
            {obj.title ? obj.title : "Untitled"}
          </p>
        </Link>

        <div className="text-gray-700 text-xs font-lato mt-3">
          {parse(content)}
        </div>
      </div>
    );
  });

  return (
    <section className="w-full">
      <div className="w-full z-40 relative ">
        <div className="flex justify-between items-center gap-4 mb-5">
          <Filters />
          <AddNote />
        </div>
        <div className="notescollec pb-2 w-full ">
          {loading && (
            <div className="flex justify-start items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500"></div>
              <p className="text-lg font-bold text-gray-900">Loading...</p>
            </div>
          )}
          <div className="grid lg:grid-cols-5 sm:grid-cols-3 w-full gap-4 ">
            {user.filteredData.length ? Docs : null}
          </div>
        </div>

        {user.filteredData.length ? <Pagination /> : null}
      </div>
    </section>
  );
};

export default Notescollec;
