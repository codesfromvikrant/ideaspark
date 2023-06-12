import { nanoid } from "nanoid";
import React, { useState, useContext } from "react";
import { db, doc, getDoc, setDoc } from "../firebase";
import { PassDataContext } from "../Contexts/PassData";
import { AppContext } from "../Contexts/AppContext";

const Dropdown = ({
  id,
  moveToTrash,
  filteredDocs,
  setFilteredDocs,
  notetags,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { userData, setUserData } = useContext(PassDataContext);
  const [tagsinnotes, setTagsInNote] = useState(notetags);

  const addtag = async (tagname, id) => {
    try {
      const docRef = doc(db, "users", userData.userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { notesdata } = docSnap.data();
        const updated = notesdata.map((note) => {
          if (note.id === id) {
            if (note.tags.includes(tagname)) return note;
            note.tags = [...note.tags, tagname];
            setFilteredDocs([...filteredDocs, note]);
          }
          return note;
        });
        await setDoc(docRef, { notesdata: updated }, { merge: true });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const taglist = userData.tags.map((tag) => {
    const added = notetags.includes(tag.tagname) ? true : false;
    const style = {
      color: added ? "#2563eb" : "#64748b",
    };
    return (
      <div
        onClick={() => {
          addtag(tag.tagname, id);
        }}
        key={nanoid()}
        className="w-full cursor-pointer hover:bg-slate-200  p-2 text-left flex justify-start items-center gap-1"
      >
        <i style={style} className="fa fa-solid fa-tag"></i>
        <p className="capitalize text-gray-700 text-xs">{tag.tagname}</p>
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
        }}
        className="w-full hover:bg-slate-200 text-red-400 font-semibold p-2 text-left"
      >
        Delete
      </button>
      <div className="min-h-max max-h-[10rem] overflow-y-scroll">
        <p className="px-2 font-semibold">Add to:</p>
        {taglist}
      </div>
    </div>
  );
};

export default Dropdown;
