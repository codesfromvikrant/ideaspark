import React from "react";
// Images
import EvernoteLogo from "../../images/idea_spark_logo.png";
// Components
import Newnote from "../Addnote";
// Routing
import { useNavigate, useParams } from "react-router-dom";

// Hooks

const Sidepanel = ({ SidepanelOpen, initialData, setUserData }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const styles = {
    display: SidepanelOpen ? "block" : "none",
  };
  return (
    <aside
      style={styles}
      className="min-w-[13rem] px-4 min-h-[100vh] overflow-y-auto bg-gray-900 font-lato md:static fixed md:block hidden z-50"
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
          className="home flex justify-start items-center gap-3 text-gray-300 hover:bg-slate-800 hover:px-4 hover:py-3 hover:text-white hover:font-semibold transition-all rounded-md  font-medium my-4 cursor-pointer"
        >
          <i className="fa fa-solid fa-house"></i>
          <p>Home</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa-solid fa-note-sticky"></i>
          <p>Notes</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Tasks</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa fa-solid fa-tag"></i>
          <p>Tags</p>
        </div>

        <div className="flex justify-start items-center gap-3 text-gray-300 font-medium my-4 cursor-pointer">
          <i className="fa fa-solid fa-trash"></i>
          <p>Trash</p>
        </div>

        <button
          onClick={() => {
            setUserData(initialData);
            navigate("/");
          }}
          className="text-white bg-gray-800 font-semibold w-full p-2 rounded-full absolute "
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidepanel;
