import React from "react";

const SecondaryBtn = ({ children, clickHandler, shouldDisable }) => {
  return (
    <button
      className={`flex justify-center items-center min-w-[82px] lg:min-w-[100px] py-[4px] lg:py-[6px] px-2 lg:px-3 text-[14px] font-[700] text-neutrals-400 h border-2 border-neutrals-200 rounded-[40px] ${
        shouldDisable !== "true"
          ? "opacity-50"
          : "over:text-neutrals-600 hover:border-gray-400"
      }`}
      onClick={clickHandler}
      disabled={shouldDisable !== "true" ? true : false}
    >
      {children}
    </button>
  );
};

export default SecondaryBtn;
