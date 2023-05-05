import React, { useEffect, useState } from "react";
import Sidepanel from "../Components/Sidepanel";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../firebase";
import Dashboard from "./Dashboard";

const Client = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    tagmsg: "",
    prevmasg: "",
    nextmsg: "",
    savemsg: "",
    deletmsg: "",
  });
  const [filterTag, setFilterTag] = useState("");
  const [SidepanelOpen, setSidepanelOpen] = useState(true);

  const initialData = {
    verified: false,
    userID: "",
    username: "",
    email: "",
    notesData: [],
  };

  const [userData, setUserData] = useState(initialData);
  const userId = sessionStorage.getItem("userId");
  const userVerified = sessionStorage.getItem("userVerified");

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
          verified: userVerified,
        }));
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
      <Outlet context={{ userData, filterTag, setFilterTag }} />
    </div>
  );
};

export default Client;
