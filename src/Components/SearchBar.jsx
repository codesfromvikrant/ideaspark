import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search Your Docs..."
      className=" w-full  my-5 bg-[#ffffff4b] rounded-full py-3 shadow-md min-w-[16rem] placeholder-gray-500 font-semibold font-lato sm:px-4 px-3 text-gray-700 outline-none"
    />
  );
};

export default SearchBar;
