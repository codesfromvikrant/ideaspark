import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useContext(AppContext);
  const { user } = state;

  function activeFilter() {
    if (searchParams.get("trash")) {
      return "trash";
    } else if (searchParams.get("tag")) {
      return "tag";
    } else {
      return "all";
    }
  }

  const tagsList = user.tags.map((el) => {
    return (
      <option key={el} className="bg-blue-200 text-gray-800 font-semibold">
        {el}
      </option>
    );
  });

  function filtering(key, value) {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  }

  function removeFilters() {
    setSearchParams((prevParam) => {
      prevParam.delete("trash");
      prevParam.delete("tag");
      return prevParam;
    });
  }

  const style = { backgroundColor: "#3b82f6", color: "white" };

  return (
    <div className="flex justify-start items-center gap-3">
      <div
        onClick={removeFilters}
        style={activeFilter() === "all" ? style : null}
        className="text-sm p-2 rounded text-gray-700 bg-slate-300 font-bold cursor-pointer flex justify-start items-center gap-2"
      >
        <p>All</p>
        <i className="fa-sharp fa-solid fa-file "></i>
      </div>
      <div
        onClick={() => filtering("trash", true)}
        style={activeFilter() === "trash" ? style : null}
        className="text-sm p-2 rounded text-gray-700 bg-slate-300 font-bold cursor-pointer flex justify-start items-center gap-2"
      >
        <p>Trash</p>
        <i className="fa-solid fa-trash"></i>
      </div>
      <select
        onChange={(e) => filtering("tag", e.target.value)}
        style={activeFilter() === "tag" ? style : null}
        className="text-sm p-2 rounded text-gray-700 bg-slate-300 font-bold cursor-pointer flex justify-start items-center gap-2"
      >
        <option className="bg-blue-200 text-gray-800 font-semibold">
          Filter By Tags{" "}
        </option>
        {tagsList}
      </select>
    </div>
  );
};

export default Filters;
