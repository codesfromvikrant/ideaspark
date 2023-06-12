import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppContext } from "../Contexts/AppContext";

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
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const location = useLocation();
  const { noteID } = useParams();

  const [saved, setSaved] = useState(false);
  const [noteData, setNoteData] = useState({
    id: noteID,
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    async function getData() {
      user.notesData.forEach((obj) => {
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

  const saveNote = () => {
    setSaved(true);
    (async () => {
      if (user.notesData.length === 0) {
        updateDoc(doc(colRef, user.userID), {
          notesdata: arrayUnion(noteData),
        });
        dispatch({
          type: "SET_NOTES_DATA",
          payload: [noteData],
        });
        return;
      }

      const notePresent = false;
      const updatedArr = user.notesData.map((obj) => {
        if (obj.id === noteID) {
          notePresent = true;
          obj.title = noteData.title;
          obj.content = noteData.content;
          return obj;
        }
        return obj;
      });
      dispatch({ type: "SET_NOTES_DATA", payload: updatedArr });
      if (notePresent) {
        updateDoc(doc(colRef, user.userID), {
          notesdata: updatedArr,
        });
      } else {
        updateDoc(doc(colRef, user.userID), {
          notesdata: arrayUnion(noteData),
        });
      }
    })();
  };

  const deleteNote = () => {
    (async () => {
      // const data = (await getDoc(doc(colRef, userData.userID))).data();
      // const { notesdata, trash } = data;
      const updatedArr = user.notesData.filter((el) => el.id !== noteID);
      dispatch({ type: "SET_NOTES_DATA", payload: updatedArr });
      if (user.trash.length === 0) {
        updateDoc(doc(colRef, user.userID), {
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
      user.notesData.forEach((obj) => {
        if (obj.id === noteID) {
          const prevTrash = user.trash;
          const newTrash = [...prevTrash, noteData];
          dispatch({ type: "SET_TRASH", payload: newTrash });
          updateDoc(doc(colRef, user.userID), {
            notesdata: updatedArr,
            trash: newTrash,
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
