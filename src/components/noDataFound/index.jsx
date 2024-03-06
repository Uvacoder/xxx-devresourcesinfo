import React from "react";

const NoDataFound = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[24px] mt-[3rem] md:mt-[7rem]">
      <div className="flex w-[120px] h-[120px] md:w-[150px] md:h-[150px] justify-center items-center">
        <video autoPlay loop muted style={{ width: "150px", height: "150px" }}>
          <source src="/No_data.webm" type="video/webm" />
        </video>
      </div>
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <p className="text-[17px] md:text-[20px] xl:text-[24px] text-neutrals-700 text-center font-[700] leading-[100%] -tracking-[0.48px]">
          No data found
        </p>
        <p className="max-w-[290px] md:max-w-[422px] text-neutrals-500 text-center text-[12px] md:text-[14px] xl:text-[16px] leading-[150%] -tracking-[0.32px] font-[500]">
          We’re unable to find any {title} matching your criteria. Please try a
          different search criteria.
        </p>
      </div>
    </div>
  );
};

export default NoDataFound;
