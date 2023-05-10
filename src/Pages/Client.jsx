import React, { useEffect, useState } from "react";
import Sidepanel from "../Components/Sidepanel";
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../firebase";
import Dashboard from "./Dashboard";

const Client = () => {
  const initialData = {
    verified: false,
    userID: "",
    username: "",
    email: "",
    notesData: [],
    tags: [],
  };

  const [userData, setUserData] = useState(initialData);
  const userId = sessionStorage.getItem("userId");
  const userVerified = sessionStorage.getItem("userVerified");
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [savedDocs, setSavedDocs] = useState([]);
  const [trashedDocs, setTrashedDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({
    tagmsg: "",
    prevmasg: "",
    nextmsg: "",
    savemsg: "",
    deletmsg: "",
  });

  // set the state by clicking the tags in the sidepanel which allow us in filtering the notes
  const [filterTag, setFilterTag] = useState("");
  const [SidepanelOpen, setSidepanelOpen] = useState(true);

  // Get the user data from the database
  async function getUserData() {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData((prev) => ({
          ...prev,
          userID: userId,
          username: docSnap.data().username,
          email: docSnap.data().email,
          notesData: docSnap.data().notesdata,
          tags: docSnap.data().tags,
          verified: userVerified,
        }));
        setSavedDocs(docSnap.data().notesdata);
        setFilteredDocs(docSnap.data().notesdata);
        setTrashedDocs(docSnap.data().trash);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    // Check if the user is logged in and verified
    if (userId && userVerified) {
      getUserData();
    } else {
      // Navigate the user to login page if not logged in
      navigate("/login");
    }
  }, [userId, userVerified, navigate]);

  // const viewDeletedDocs = () => {
  //   setFilteredDocs(trashedDocs);
  // };

  const viewSavedDocs = () => {
    setSearchParams((prevParam) => {
      prevParam.delete("trash");
      prevParam.delete("tag");
      return prevParam;
    });
    setFilteredDocs(savedDocs);
  };

  return (
    <div className="h-[100vh] flex justify-start items-start relative">
      <div
        onClick={() => setSidepanelOpen((prev) => !prev)}
        className="bg-gray-900 shadow-2xl text-white p-3 rounded absolute top-6 right-5 md:hidden block"
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      <Sidepanel
        SidepanelOpen={SidepanelOpen}
        userData={userData}
        initialData={initialData}
        setUserData={setUserData}
        setFilterTag={setFilterTag}
      />
      <Outlet
        context={{
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
        }}
      />
    </div>
  );
};

export default Client;
