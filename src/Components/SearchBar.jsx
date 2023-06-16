import React from "react";

const SearchBar = ({ searchDocs }) => {
  return (
    <div className="w-full bg-white rounded-md py-3 px-4 shadow-md flex justify-start items-center gap-3">
      <input
        type="text"
        onChange={searchDocs}
        placeholder="Search Your Docs..."
        className="w-full placeholder-gray-500 font-bold font-lato text-gray-700 outline-none"
      />
      <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
    </div>
  );
};

export default SearchBar;
