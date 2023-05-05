import React, { useEffect, useState } from "react";

const Pagination = ({ docsPerPage, totalDocs, paginate }) => {
  const totalPgBtn = Math.ceil(totalDocs / docsPerPage);
  console.log(totalPgBtn);
  const [start, setStart] = useState(1);
  const btnCount = 4;
  const [end, setEnd] = useState(1);
  useEffect(() => {
    if (totalPgBtn < btnCount) {
      setEnd(totalPgBtn);
    } else {
      setEnd(btnCount);
    }
  }, [totalDocs, docsPerPage]);

  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  const pgnBtns = arr.map((el) => {
    return (
      <div
        key={el}
        onClick={() => {
          paginate("page", el);
        }}
        className="bg-slate-400 hover:bg-slate-900 transition-all duration-500 shadow py-2 px-3 text-sm text-gray-100 rounded cursor-pointer"
      >
        {el}
      </div>
    );
  });

  const nextBtn = () => {
    if (end === totalPgBtn) return;
    if (end + btnCount > totalPgBtn) {
      setStart(start + totalPgBtn - end);
      setEnd(totalPgBtn);
    } else {
      setStart(start + btnCount);
      setEnd(end + btnCount);
    }
  };

  const prevBtn = () => {
    if (start === 1) return;
    if (start - btnCount < 1) {
      setStart(1);
      setEnd(btnCount);
    } else {
      setStart(start - btnCount);
      setEnd(end - btnCount);
    }
  };

  return (
    <div className="flex justify-center mt-4 items-center gap-3">
      <button
        onClick={prevBtn}
        className="bg-slate-300 text-gray-900 hover:text-gray-100 hover:bg-slate-900 transition-all duration-500 text-sm rounded py-2 px-3"
      >
        Prev
      </button>
      <div className="flex justify-center items-center gap-2">{pgnBtns}</div>
      <button
        onClick={nextBtn}
        className="bg-slate-300 text-gray-900 hover:text-gray-100 hover:bg-slate-900 transition-all duration-500 text-sm rounded py-2 px-3"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
