import React, { useEffect, useState } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  setDoc,
  getDoc,
  doc,
  colRef,
  updateDoc,
  arrayUnion,
} from "../firebase";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Texteditor = () => {
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const { userData, trashedDocs, setTrashedDocs } = useOutletContext();
  const { noteID } = useParams();

  // console.log(...trashedDocs);

  const [noteData, setNoteData] = useState({
    id: noteID,
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    async function getData() {
      const data = (await getDoc(doc(colRef, userData.userID))).data();
      const { notesdata } = data;
      notesdata.forEach((obj) => {
        if (obj.id === noteID) {
          setNoteData((prev) => ({
            ...prev,
            title: obj.title,
            content: obj.content,
          }));
        }
      });
    }
    getData();
  }, [location]);

  const handleTextEditor = (value) => {
    setNoteData((prev) => ({ ...prev, content: value }));
  };
  const handleTitle = (event) => {
    const { value } = event.target;
    setNoteData((prev) => ({ ...prev, title: value }));
  };

  // Save Note and add to notesdata
  const saveNote = () => {
    setSaved(true);
    (async () => {
      const data = (await getDoc(doc(colRef, userData.userID))).data();
      const { notesdata } = data;

      if (notesdata.length === 0) {
        updateDoc(doc(colRef, userData.userID), {
          notesdata: arrayUnion(noteData),
        });
      }

      notesdata.forEach((obj) => {
        if (obj.id === noteID) {
          obj.title = noteData.title;
          obj.content = noteData.content;

          const updatedArr = notesdata;
          updateDoc(doc(colRef, userData.userID), {
            notesdata: updatedArr,
          });
        } else {
          updateDoc(doc(colRef, userData.userID), {
            notesdata: arrayUnion(noteData),
          });
        }
      });
    })();
  };

  // Delete Note and add to trash
  const deleteNote = () => {
    (async () => {
      const data = (await getDoc(doc(colRef, userData.userID))).data();
      const { notesdata, trash } = data;
      const updatedArr = notesdata.filter((el) => el.id !== noteID);
      //console.log(trash);
      if (trash.length === 0) {
        updateDoc(doc(colRef, userData.userID), {
          notesdata: updatedArr,
          trash: arrayUnion(noteData),
        });

        setNoteData((prev) => ({
          ...prev,
          title: "",
          content: "",
        }));

        return;
      }

      notesdata.forEach((obj) => {
        if (obj.id === noteID) {
          setTrashedDocs([...trashedDocs, obj]);
          setNoteData((prev) => ({
            ...prev,
            title: "",
            content: "",
          }));

          updateDoc(doc(colRef, userData.userID), {
            notesdata: updatedArr,
            trash: [...trashedDocs, obj],
          });
        } else {
          setNoteData((prev) => ({
            ...prev,
            title: "",
            content: "",
          }));
        }
      });
    })();
  };

  return (
    <div className="w-full p-4 h-[100vh] bg-gray-200  overflow-y-scroll">
      <div className="action-bar mb-2 flex justify-end gap-3">
        <input
          type="text"
          value={noteData.title}
          onChange={handleTitle}
          placeholder="Write Your Title Here..."
          className="w-full py-2 px-4 rounded-md shadow outline-2 outline-gray-900"
        />
        <button
          onClick={saveNote}
          className="text-gray-200 hover:text-gray-200 hover:bg-blue-500 hover:shadow-2xl transition-all duration-500 font-semibold bg-gray-900 w-max shadow px-6 py-2 rounded-md"
        >
          Save
        </button>

        <button
          onClick={deleteNote}
          className="text-gray-900 hover:text-gray-200 hover:bg-blue-500 hover:shadow-2xl transition-all duration-500 font-semibold bg-gray-100 w-max shadow px-6 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
      <ReactQuill
        value={noteData.content}
        onChange={handleTextEditor}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default Texteditor;
