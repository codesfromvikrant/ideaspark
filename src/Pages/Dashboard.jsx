import React, { useState } from "react";
import Docscollec from "../Components/Docscollec";
import "lazysizes";
import { getDoc, doc, colRef } from "../firebase";
import { AppContext } from "../Contexts/AppContext";
import SearchBar from "../Components/SearchBar";
import Intro from "../Components/Intro";
import LogoutBtn from "../Components/LogoutBtn";

const Dashboard = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { user } = state;

  const searchDocs = (e) => {
    const searchTerm = e.target.value;
    const searchedDocs = user.notesData.filter((obj) => {
      return (
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    dispatch({ type: "SET_FILTERED_DATA", payload: searchedDocs });
  };

  return (
    <main className="w-full h-[100vh] py-3 bg-gradient-to-r from-slate-100 to-slate-300 overflow-y-scroll">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-start sm:items-center items-start gap-4 mb-5">
          <SearchBar searchDocs={searchDocs} />
          <Intro />
          <LogoutBtn />
        </div>

        <div className="flex justify-start items-center gap-4 z-50 h-max">
          <Docscollec />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
