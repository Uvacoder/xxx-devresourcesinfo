import React from "react";

const PrimaryBtn = ({ text }) => {
  return (
    <button
      className={`relative primaryBtn lg:h-[44px] xl:h-[48px] btn hidden sm:flex justify-between items-center px-[16px] py-[8px] xl:py-[16px] xl:px-[24px] text-white rounded-full font-bold text-[14px] xl:text-[16px]`}
    >
      {text}
      <span className="absolute w-[100px] h-[19px] xl:w-[125px] xl:h-[23px] right-[8px] top-[3px] rounded-[44px] bg-[#ffffff29]"></span>
    </button>
  );
};

export default PrimaryBtn;
