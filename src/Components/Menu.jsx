import React from "react";

const Menu = ({ openDialog, id }) => {
  return (
    <div
      onClick={() => {
        openDialog(id);
      }}
      className="bg-gray-300 hover:bg-blue-300 transition-all  shadow p-1 rounded flex justify-center absolute right-2 "
    >
      <i className="fa fa-solid fa-ellipsis-vertical text-base text-gray-900 z-99"></i>
    </div>
  );
};

export default Menu;
