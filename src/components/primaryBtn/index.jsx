import React from "react";

const PrimaryBtn = ({ text, clickHandler }) => {
  return (
    <button
      className={`relative primaryBtn lg:h-[44px] xl:h-[48px] btn flex justify-between items-center px-[10px] py-[6px] lg:px-[15px] xl:py-[16px] xl:px-[24px] text-white rounded-full font-bold text-[14px] lg:text-[14px] xl:text-[16px]`}
      onClick={clickHandler}
    >
      {text}
      <span className="absolute w-[87px] h-[14px] lg:w-[93px] lg:h-[23px] xl:w-[125px] right-[8px] top-[3px] rounded-[44px] bg-[#ffffff29]"></span>
    </button>
  );
};

export default PrimaryBtn;
