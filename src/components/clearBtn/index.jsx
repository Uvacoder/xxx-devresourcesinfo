import React from "react";
import { RxCross2 } from "react-icons/rx";

const ClearBtn = ({ clickHandler }) => {
  return (
    <button
      className="flex items-center font-[700] text-primary-end rounded-[40px] gap-[4px] xl:gap-[8px] py-[8px] xl:px-[16px]  xl:hover:bg-indigos-op-100 xl:active:bg-indigos-op-200"
      onClick={clickHandler}
    >
      <RxCross2 className="w-[16px] h-[16px]" />
      <span className="text-[14px]">Clear filters</span>
    </button>
  );
};

export default ClearBtn;
