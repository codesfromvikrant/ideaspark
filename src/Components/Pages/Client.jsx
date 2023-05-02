import React, { useEffect, useState } from "react";
import Sidepanel from "./Sidepanel";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../../firebase";
import Dashboard from "./Dashboard";

const Client = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [SidepanelOpen, setSidepanelOpen] = useState(true);

  const initialData = {
    verified: false,
    userID: "",
    username: "",
    email: "",
    notesData: [],
    scratchpad: "",
  };

  const [userData, setUserData] = useState(initialData);

  useEffect(() => {
    const state = location.state;
    console.log(state);

    // Check if the user is logged in and verified
    if (state && state.userId && state.userVerified) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        userID: state.userId,
        verified: state.userVerified,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    //Get the user data from the database using the user id
    if (userData.userID) {
      (async function () {
        try {
          const docRef = doc(db, "users", userData.userID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData((prev) => ({
              ...prev,
              username: docSnap.data().username,
              email: docSnap.data().email,
              scratchpad: docSnap.data().scratchpad,
              notesData: docSnap.data().notesdata,
            }));
          }
        } catch (err) {
          console.log(err.message);
        }
      })();
    }
  }, [userData.userID]);

  console.log(userData);

  return (
    <div className="h-[100vh] flex justify-start items-start relative">
      <div
        onClick={() => setSidepanelOpen((prev) => !prev)}
        className="bg-gray-900 shadow-2xl text-white p-3 rounded absolute top-6 right-5 md:hidden block"
      >
        <i class="fa-solid fa-bars"></i>
      </div>

      <Sidepanel
        SidepanelOpen={SidepanelOpen}
        initialData={initialData}
        setUserData={setUserData}
      />
      <Outlet>
        <Dashboard userData={userData} />
      </Outlet>
    </div>
  );
};

export default Client;
