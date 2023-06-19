import React from "react";

const Menu = ({ openDialog, id }) => {
  return (
    <div
      onClick={() => {
        openDialog(id);
      }}
      className="bg-slate-300 shadow p-1 rounded flex justify-center absolute right-2 "
    >
      <i className="fa fa-solid fa-ellipsis-vertical text-base text-gray-900 z-99"></i>
    </div>
  );
};

export default Menu;
