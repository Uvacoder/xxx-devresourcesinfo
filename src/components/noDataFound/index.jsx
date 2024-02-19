import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[24px]">
      <div className="flex w-[150px] h-[150px] justify-center items-center gap-[10px]"></div>
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <p className="text-[24px] text-neutrals-700 text-center font-[700] leading-[100%] -tracking-[0.48px]">
          No data found
        </p>
        <p className="text-neutrals-500 text-center text-[16px] leading-[150%] -tracking-[0.32px] font-[500]">
          We’re unable to find any conference matching your criteria. Please try
          a different search criteria
        </p>
      </div>
    </div>
  );
};

export default NoDataFound;
