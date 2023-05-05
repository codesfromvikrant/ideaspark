import React, { useState, useEffect } from "react";
// Images
import EvernoteLogo from "../images/idea_spark_logo.png";
// Components
import Newnote from "./Addnote";
// Routing
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../firebase";
import Addtags from "./Addtags";
import { nanoid } from "nanoid";
// Hooks

const Sidepanel = ({
  SidepanelOpen,
  userData,
  initialData,
  setUserData,
  setFilterTag,
}) => {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [addTag, setAddTag] = useState("");
  const [message, setMessage] = useState("");

  function handleTrash(key, value) {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  }

  async function getTags() {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTags(docSnap.data().tags);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (userData.userID) {
      getTags();
    }
  }, [userData.userID]);

  const tagList = tags.map((tag) => {
    return (
      <div
        key={nanoid()}
        // onClick={() => {
        //   handleTrash("tag", tag);
        // }}
        className="flex justify-between items-center gap-3 text-gray-300 pl-4 py-1"
      >
        <p
          onClick={() => {
            setFilterTag(tag.tagname);
          }}
          className="cursor-pointer text-gray-400 text-sm hover:text-blue-500 capitalize"
        >
          {tag.tagname}
        </p>
        <div className="bg-slate-800 rounded text-xs text-gray-400 py-1 px-2 font-semibold flex justify-center items-center">
          {tag.docscount}+
        </div>
      </div>
    );
  });

  const addTagToDB = async () => {
    try {
      const tagadded = false;
      tags.forEach((tag) => {
        if (tag.tagname.toLowerCase() === addTag.toLowerCase()) {
          setMessage("Tag already exists");
          tagadded = true;
        }
      });
      if (tagadded === true || addTag === "") return;
      const docRef = doc(db, "users", userData.userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const prevTags = docSnap.data().tags;
        const newTags = [...prevTags, { tagname: addTag, docscount: 0 }];
        await setDoc(docRef, { tags: newTags }, { merge: true });
        setTags(newTags);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const styles = {
    display: SidepanelOpen ? "block" : "none",
  };
  return (
    <aside
      style={styles}
      className="min-w-[13rem] px-4 min-h-[100vh] overflow-y-scroll bg-gray-900 font-lato md:static fixed md:block hidden z-50"
    >
      <div className="w-full h-full mx-auto my-6 relative">
        <div className="logo flex justify-start items-center gap-3 mb-4">
          <img src={EvernoteLogo} className="w-24 mx-auto" />
        </div>
        <Newnote />

        <div
          onClick={() => {
            navigate(`/user/${userId}`);
          }}
          className="home flex justify-start items-center gap-3 text-gray-300 hover:bg-slate-800 hover:px-4 hover:py-3 hover:text-white hover:font-semibold transition-all duration-500 rounded-md  font-medium my-4 cursor-pointer"
        >
          <i className="fa fa-solid fa-house"></i>
          <p>Home</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer ">
          <i className="fa-solid fa-note-sticky"></i>
          <p>Docs</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer ">
          <i className="fa-solid fa-list"></i>
          <p>Tasks</p>
        </div>

        <div className="flex justify-between items-center mb-2 cursor-pointer">
          <div className="flex justify-start items-center gap-3 text-gray-300 font-medium cursor-pointer ">
            <i className="fa fa-solid fa-tag"></i>
            <p>Tags</p>
          </div>
          <i className="fa-solid fa-caret-down text-white"></i>
        </div>
        <div className="my-2">{tagList}</div>

        <Addtags
          addTag={addTag}
          addTagToDB={addTagToDB}
          message={message}
          setMessage={setMessage}
          setAddTag={setAddTag}
        />

        <div
          onClick={() => {
            handleTrash("trash", true);
          }}
          className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer hover:bg-slate-800 hover:px-4 hover:py-3  hover:text-white hover:font-semibold transition-all duration-500 rounded-md"
        >
          <i className="fa fa-solid fa-trash"></i>
          <p>Trash</p>
        </div>
      </div>

      <button
        onClick={() => {
          setUserData(initialData);
          navigate("/");
        }}
        className="text-white bg-slate-800 font-semibold w-full hover:bg-blue-600 transition-all duration-500 p-2 rounded-md"
      >
        Log Out
      </button>
    </aside>
  );
};

export default Sidepanel;
