import React, { useState, useEffect, useContext } from "react";
import { PassDataContext } from "../Contexts/PassData";
import { getDoc, doc, colRef } from "../firebase";
import { Link, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const Notescollec = () => {
  const { userData, filterTag, setFilterTag } = useContext(PassDataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docsPerPage, setDocsPerPage] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDocs, setFilteredDocs] = useState(docs);

  // console.log(docs);

  const trash = searchParams.get("trash");
  const page = searchParams.get("page") ? searchParams.get("page") : 1;

  const paginate = (key, value) => {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  };

  // Docs in trash
  const allDocs = () => {
    const newdocs = docs.filter((obj) => obj.trash === false);
    setFilterTag("");
    setFilteredDocs(newdocs);
  };

  const deletedDocs = () => {
    const newdocs = trash
      ? docs.filter((obj) => obj.trash === true)
      : docs.filter((obj) => obj.trash === false);
    setFilteredDocs(newdocs);
  };

  useEffect(() => {
    deletedDocs();
  }, [trash]);

  // Filter Docs by tags
  useEffect(() => {
    if (filterTag === "") return;
    const filtered = docs.filter((obj) => {
      if (obj.tags === undefined) return false;
      return obj.tags.includes(filterTag);
    });
    setFilteredDocs(filtered);
  }, [filterTag]);

  // Search Docs
  const searchDocs = () => {
    const searchedDocs = docs.filter((obj) => {
      return (
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredDocs(searchedDocs);
  };

  // get docs from firestore DB
  useEffect(() => {
    if (userData.userID === "") return;
    const docRef = doc(colRef, userData.userID);
    getDoc(docRef)
      .then((snap) => {
        const { notesdata } = snap.data();
        setDocs(notesdata);
        setFilteredDocs(notesdata);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.userID]);

  const Docs = filteredDocs.map((obj, i) => {
    let startDocs = (page - 1) * docsPerPage;
    let endDocs = page * docsPerPage;
    if (endDocs > docs.length) endDocs = docs.length;
    if (i < startDocs || i >= endDocs) return null;
    const content = obj.content;
    return (
      <div
        key={obj.id}
        className="cursor-pointer h-[15rem]  p-4 rounded relative text-sm bg-white text-gray-900 overflow-hidden"
      >
        <div className="bg-gray-300 hover:bg-blue-300 transition-all shadow w-3 h-6 rounded flex justify-center absolute right-2 ">
          <i className="fa fa-solid fa-ellipsis-vertical text-base text-gray-900 z-99"></i>
        </div>
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
        <h3 className="mb-3 text-gray-900 text-2xl font-black uppercase tracking-wider">
          📄 Saved Docs...
        </h3>
        {filterTag && (
          <div className="flex justify-start items-center gap-3 mb-4">
            <p className="text-base font-bold text-gray-900">
              Filtered by tag:{"  "}
              <span className="text-blue-600">{filterTag}</span>
            </p>
            <button
              className="bg-blue-600 text-white text-sm font-semibold tracking-wider px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={() => {
                allDocs();
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
