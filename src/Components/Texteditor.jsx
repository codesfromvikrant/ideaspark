import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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

const Texteditor = () => {
  const [saved, setSaved] = useState(false);
  const location = useLocation();

  const { userId, noteID } = useParams();
  const [noteData, setNoteData] = useState({
    id: noteID,
    title: "",
    content: "",
    trash: false,
  });

  // console.log(noteData);

  useEffect(() => {
    async function getData() {
      const data = (await getDoc(doc(colRef, userId))).data();
      const { notesdata } = data;
      //console.log(notesdata);

      notesdata.forEach((obj) => {
        // console.log(obj);
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

  const handleTextEditor = (value) => {
    setNoteData((prev) => ({ ...prev, content: value }));
  };
  const handleTitle = (event) => {
    const { value } = event.target;
    setNoteData((prev) => ({ ...prev, title: value }));
  };

  // Styling Components
  // const style = {
  //   resize: 'none',
  //   overflow: 'hidden',
  //   position: 'relative',
  //   width: '100%'
  // }

  const saveNote = () => {
    setSaved(true);

    (async () => {
      const data = (await getDoc(doc(colRef, userId))).data();

      const { notesdata } = data;
      console.log(notesdata);
      if (notesdata.length === 0) {
        updateDoc(doc(colRef, userId), {
          notesdata: arrayUnion(noteData),
        });
        //alert("Note Saved");
      }

      notesdata.forEach((obj) => {
        if (obj.id === noteID) {
          obj.title = noteData.title;
          obj.content = noteData.content;
          setNoteData((prev) => ({
            ...prev,
            trash: false,
          }));

          const updatedArr = notesdata;
          updateDoc(doc(colRef, userId), {
            notesdata: updatedArr,
          });

          //alert("Note Saved");
        } else {
          updateDoc(doc(colRef, userId), {
            notesdata: arrayUnion(noteData),
          });

          //alert("Note Saved");
        }
      });
    })();
  };

  //console.log(noteData);

  const deleteNote = () => {
    (async () => {
      const data = (await getDoc(doc(colRef, userId))).data();

      const { notesdata } = data;
      console.log(notesdata);

      notesdata.forEach((obj) => {
        if (obj.id === noteID) {
          obj.trash = true;

          const updatedArr = notesdata;
          updateDoc(doc(colRef, userId), {
            notesdata: updatedArr,
          });
        } else {
          setNoteData((prev) => ({
            ...prev,
            title: "",
            content: "",
          }));
        }
      });

      //alert("Note Deleted");
    })();
  };

  return (
    <div className="w-full p-4 h-[100vh] bg-gray-200  overflow-y-scroll">
      {/* <textarea onChange={handleInput} name="title" style={style} className="p-4 rounded text-4xl outline-none" placeholder="Title"></textarea>
      <textarea onChange={handleInput} name="content" style={{ ...style, height: '100%' }} className="p-4 rounded text-lg outline-none" placeholder="Start Writing..."></textarea> */}

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
