import React, { useState, useEffect, useContext, useMemo } from "react";
import { PassDataContext } from "../Contexts/PassData";
import { getDoc, doc, colRef, updateDoc } from "../firebase";
import { Link, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import Menu from "./Menu";

const Notescollec = () => {
  const {
    userData,
    setUserData,
    savedDocs,
    setSavedDocs,
    trashedDocs,
    setTrashedDocs,
    filteredDocs,
    setFilteredDocs,
    viewSavedDocs,
    loading,
  } = useContext(PassDataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [docsPerPage, setDocsPerPage] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();

  const trash = searchParams.get("trash");
  const tag = searchParams.get("tag");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;

  // Pagination
  const paginate = (key, value) => {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  };

  // Filter Docs by tags
  useEffect(() => {
    if (tag) {
      const filtered = savedDocs.filter((obj) => {
        if (obj.tags === undefined) return false;
        return obj.tags.includes(tag);
      });
      setFilteredDocs(filtered);
    }
    if (trash) {
      setFilteredDocs(trashedDocs);
    }
  }, [tag, trash]);

  // Search Docs
  const searchDocs = () => {
    const searchedDocs = filteredDocs.filter((obj) => {
      return (
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredDocs(searchedDocs);
  };

  const openDialog = (id) => {
    const dialog = document.querySelector(`#dropdown-${id}`);
    dialog.classList.toggle("hidden");
  };

  // Move the doc to trash
  const moveToTrash = (id) => {
    const newDocs = filteredDocs.map((obj) => {
      if (obj.id === id) {
        setTrashedDocs([...trashedDocs, obj]);
        const updateDocs = filteredDocs.filter((obj) => obj.id !== id);
        setFilteredDocs(updateDocs);
        setSavedDocs(updateDocs);

        updateDoc(doc(colRef, userData.userID), {
          notesdata: updateDocs,
          trash: [...trashedDocs, obj],
        });
      }
      return obj;
    });
  };

  const Docs = filteredDocs.map((obj, i) => {
    // conditions for pagination
    let startDocs = (page - 1) * docsPerPage;
    let endDocs = page * docsPerPage;
    if (endDocs > savedDocs.length) endDocs = savedDocs.length;
    if (i < startDocs || i >= endDocs) return null;

    const content = obj.content;

    return (
      <div
        key={obj.id}
        className="cursor-pointer h-[15rem] p-4 rounded relative text-sm bg-white text-gray-900 overflow-hidden"
      >
        <Menu openDialog={openDialog} id={obj.id} />
        <Dropdown
          id={obj.id}
          moveToTrash={moveToTrash}
          filteredDocs={filteredDocs}
          setFilteredDocs={setFilteredDocs}
          notetags={obj.tags}
        />
        <Link to={`/user/${userData.userID}/n/${obj.id}`}>
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
      <div className="w-full">
        <SearchBar
          searchDocs={searchDocs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="bg-gradient-to-r from-slate-200 to-gray-200 shadow-2xl w-full sm:p-6 p-4 py-6 rounded-md z-40 relative ">
        {trash ? ( // if trash is true then show deleted docs else show all docs
          <div className="flex justify-start items-center gap-3 mb-4">
            <h3 className=" text-gray-900 text-2xl font-black uppercase tracking-wider">
              Deleted Docs...
            </h3>
            <button
              onClick={viewSavedDocs}
              className="bg-blue-600 hover:bg-blue-700 transition-all text-sm text-white p-2 rounded-md tracking-wider"
            >
              <span>&larr;</span> Back to Saved Docs...
            </button>
          </div>
        ) : (
          <h3 className="mb-3 text-gray-900 text-2xl font-black uppercase tracking-wider">
            Saved Docs...
          </h3>
        )}

        {tag && (
          <div className="flex justify-start items-center gap-3 mb-4">
            <p className="text-base font-bold text-gray-900">
              Filtered by tag:{"  "}
              <span className="text-blue-600">{tag}</span>
            </p>
            <button
              className="bg-blue-600 text-white text-sm font-semibold tracking-wider px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={() => {
                viewSavedDocs();
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
        <div className="notescollec pb-2 w-full ">
          {loading && (
            <div className="flex justify-start items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
              <p className="text-lg font-bold text-gray-900">Loading...</p>
            </div>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 w-full gap-4 ">
            {filteredDocs && Docs}
          </div>
        </div>

        {filteredDocs && (
          <Pagination
            docsPerPage={docsPerPage}
            totalDocs={filteredDocs.length}
            paginate={paginate}
          />
        )}
      </div>
    </section>
  );
};

export default Notescollec;
