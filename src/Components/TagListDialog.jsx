import React, { useEffect, useRef, useContext } from "react";
import Addtags from "./Addtags";
import { db, doc, getDoc, setDoc } from "../firebase";
import { AppContext } from "../Contexts/AppContext";

const TagListDialog = () => {
  const { state, dispatch } = useContext(AppContext);
  const { user, tag } = state;
  const dialogBoxRef = useRef(null);

  const addTagToDB = async () => {
    try {
      const tagadded = false;
      user.tags.forEach((el) => {
        if (el.toLowerCase() === tag.toLowerCase()) {
          dispatch({ type: "SET_MESSAGE", payload: "Tag already exists" });
          tagadded = true;
        }
      });
      if (tagadded === true || tag === "") return;
      const docRef = doc(db, "users", user.userID);
      const prevTags = user.tags;
      const newTags = [...prevTags, tag];
      dispatch({ type: "SET_TAGS", payload: newTags });
      await setDoc(docRef, { tags: newTags }, { merge: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTagFromDB = async (tagname) => {
    const prevTags = user.tags;
    const newTags = prevTags.filter((el) => {
      return el != tagname;
    });
    dispatch({ type: "SET_TAGS", payload: newTags });
    const docRef = doc(db, "users", user.userID);
    await setDoc(docRef, { tags: newTags }, { merge: true });
  };

  const tagList = user.tags.map((tagname) => {
    return (
      <div
        key={tagname}
        className="flex justify-between items-center gap-3 text-gray-800 py-2 px-3 bg-gray-300 my-1 rounded-md"
      >
        <p className="cursor-pointer text-gray-800 font-semibold text-sm hover:text-blue-500 capitalize">
          {tagname}
        </p>
        <div className="flex justify-end items-center gap-2">
          {/* <i className="fa-solid fa-pen text-gray-100 cursor-pointer hover:text-blue-500 transition-all duration-750"></i> */}
          <i
            onClick={() => deleteTagFromDB(tagname)}
            className="fa-solid fa-trash text-blue-500 text-sm cursor-pointer hover:text-red-500 transition-all duration-750"
          ></i>
        </div>
      </div>
    );
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dialogBoxRef.current &&
        !dialogBoxRef.current.contains(event.target)
      ) {
        dispatch({ type: "SET_TAG_DIALOG", payload: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        backdropFilter: "blur(3px)",
        backgroundOpacity: "0.5",
      }}
      className="w-[100vw] h-[100vh] z-[99] fixed top-0 left-0 flex justify-center items-center"
    >
      <div
        ref={dialogBoxRef}
        className="bg-gray-100 p-4 rounded shadow-2xl min-h-[16rem]"
      >
        <Addtags addTagToDB={addTagToDB} />
        <div className="mt-2">{tagList}</div>
      </div>
    </div>
  );
};

export default TagListDialog;
