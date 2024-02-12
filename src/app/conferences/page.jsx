"use client";
import React, { useEffect } from "react";
import ConferenceTable from "@/components/conferenceTable";
import ConferenceFilterBar from "@/components/conferenceFilterBar";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingConferences } from "@/redux/features/conference/action";

const Conferences = () => {
  const dispatch = useDispatch();
  const { allConferences, status } = useSelector(
    ({ conferences }) => conferences
  );

  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);
  useEffect(() => {
    dispatch(fetchUpcomingConferences(convertedDate));
  }, []);

  const currentYear = currentDate.split("-")[0];

  return (
    <main className="min-h-[600px]">
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] mt-[30px] lg:mt-[40px]">
        Developers Conferences
      </h1>
      <p className="text-neutrals-800 font-[500] text-[25px] sm:text-[30px] lg:text-[40px]">
        for {currentYear}
      </p>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of the developer conferences for {currentYear} and beyond
      </p>
      <ConferenceFilterBar />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allConferences.length > 0 ? (
        <ConferenceTable data={allConferences} />
      ) : (
        status === "success" && <p>No conferences found!</p>
      )}
    </main>
  );
};

export default Conferences;
