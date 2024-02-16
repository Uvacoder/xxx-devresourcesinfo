import React from "react";

const PrimaryBtn = ({ text }) => {
  return (
    <button
      className={`primaryBtn lg-[44px] xl:h-[48px] btn hidden sm:flex justify-between items-center px-[16px] py-[8px] xl:py-[16px] xl:px-[24px] text-white rounded-full font-bold text-[14px] xl:text-[16px]`}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
