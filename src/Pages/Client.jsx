import React, { useEffect, useState, useContext } from "react";
import Sidepanel from "../Components/Sidepanel";
import {
  Outlet,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { db, doc, getDoc, setDoc } from "../firebase";
import { AppContext } from "../Contexts/AppContext";
import TagListDialog from "../Components/TagListDialog";
import MiddlePanel from "../Components/MiddlePanel";

const Client = () => {
  const { state, dispatch } = useContext(AppContext);
  const { tagDialog } = state;
  const savedData = sessionStorage.getItem("userData");
  const userAuth = JSON.parse(savedData);
  const userId = userAuth.uid;
  const userVerified = userAuth.verified;

  const location = useLocation();
  const navigate = useNavigate();

  // set the state by clicking the tags in the sidepanel which allow us in filtering the notes
  const [filterTag, setFilterTag] = useState("");
  const [SidepanelOpen, setSidepanelOpen] = useState(true);

  // Get the user data from the database
  async function getUserData() {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({
          type: "SET_USER",
          payload: {
            userID: userId,
            username: docSnap.data().username,
            email: docSnap.data().email,
            notesData: docSnap.data().notesdata,
            tags: docSnap.data().tags,
            verified: userVerified,
            trash: docSnap.data().trash,
            filteredData: docSnap.data().notesdata,
          },
        });
        console.log(docSnap.data().trash);
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // Filter Docs by tags
  // useEffect(() => {
  //   if (tag) {
  //     const filtered = user.notesData.filter((obj) => {
  //       if (obj.tags === undefined) return false;
  //       return obj.tags.includes(tag);
  //     });
  //     dispatch({ type: "SET_FILTERED_DATA", payload: filtered });
  //   }
  //   if (trash) {
  //     console.log("trash");
  //     const filtered = user.trash;
  //     dispatch({ type: "SET_FILTERED_DATA", payload: filtered });
  //   }
  // }, [tag, trash]);

  useEffect(() => {
    if (userId && userVerified) {
      getUserData();
    } else {
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
      {tagDialog && <TagListDialog />}
      <Sidepanel SidepanelOpen={SidepanelOpen} setFilterTag={setFilterTag} />
      <MiddlePanel />
      <Outlet />
    </div>
  );
};

export default Client;
