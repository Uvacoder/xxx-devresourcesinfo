"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import AreaAccordion from "../areaAccordion";
import AudienceAccordion from "../audienceAccordion";

const MobileFilterBar = ({
  page,
  pageState,
  clearFunc,
  showPastDate,
  area,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="block xl:hidden px-2 xs-450:px-5 py-2 xs-450:py-3 text-neutrals-400 border border-indigos-op-100 rounded-[8px] mb-[10px] cursor-pointer">
      <div
        className="flex justify-between items-center text-neutrals-500 hover:text-neutrals-700"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <span className="font-[500] text-[14px] xs-450:text-[15px]">
          Filters
        </span>
        <IoChevronDownSharp className="p-[1px]" />
      </div>
      {showFilters && (
        <div>
          {area ? (
            <AreaAccordion
              page={page}
              pageState={pageState}
              clearFunc={clearFunc}
              showPastDate={showPastDate}
            />
          ) : (
            <AudienceAccordion
              page={page}
              pageState={pageState}
              clearFunc={clearFunc}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MobileFilterBar;
