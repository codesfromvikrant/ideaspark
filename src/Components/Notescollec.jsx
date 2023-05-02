import React, { useState, useEffect } from "react";
import { getDoc, doc, colRef } from "../firebase";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";

const Notescollec = () => {
  const { userId, noteID } = useParams();
  // Getting notes data from firestore
  const docRef = doc(colRef, userId);
  const [notes, setNotes] = useState([]);

  console.log(notes);

  useEffect(() => {
    getDoc(docRef)
      .then((snap) => {
        const { notesdata } = snap.data();
        setNotes(notesdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const savednotes = notes.map((obj) => {
    if (obj.trash === false) {
      const content = obj.content;
      return (
        <Link key={obj.id} to={`/user/${userId}/n/${obj.id}`}>
          <div className="cursor-pointer h-[15rem]  p-4 rounded relative text-sm bg-white text-gray-900 overflow-hidden">
            <div className="bg-gray-300 shadow w-3 h-6 rounded flex justify-center absolute right-2 ">
              <i className="fa fa-solid fa-ellipsis-vertical text-base text-gray-900 z-99"></i>
            </div>
            <p className="font-bold text-base">
              {obj.title ? obj.title : "Untitled"}
            </p>

            <div className="text-gray-700 text-xs font-lato mt-3">
              {parse(content)}
            </div>
          </div>
        </Link>
      );
    }
  });

  return (
    <div className="bg-gradient-to-r from-slate-200 to-gray-200 shadow-2xl w-full sm:p-6 p-4 py-6 rounded-md z-40 relative ">
      <h3 className="mb-3 text-gray-900 text-xl font-black uppercase tracking-wider">
        Saved Docs...
      </h3>
      <div className="notescollec pb-2 w-full ">
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 w-full gap-4 ">
          {notes && savednotes}
        </div>
      </div>
    </div>
  );
};

export default Notescollec;
