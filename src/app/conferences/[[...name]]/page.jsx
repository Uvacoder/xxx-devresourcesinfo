"use client";
import React, { useEffect } from "react";
import {
  getCurrentDate,
  addQuotesToString,
  extractDataFromURL,
} from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";
import {
  clearConfFilters,
  setConferenceDataByUrl,
  setTodayDate,
} from "@/redux/features/conference/conferenceSlice";
import PageContainer from "@/components/pageContainer";
import { CONFERENCES_URL } from "@/utils/constants";
import Breadcrumb from "@/components/breadcrumb";
import AreaFilterBar from "@/components/areaFilterBar";
import AreaTable from "@/components/areaTable";
import { usePathname } from "next/navigation";
import { fetchAreaFilterFromURL, handleAreaBreadcrumb, updateAreaURLAndData } from "@/utils/urlFunc";

const Conferences = ({ params: { name } }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const conferences = useSelector(({ conferences }) => conferences);
  const {
    allConferences,
    status,
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = conferences;
  const dataFromURL = extractDataFromURL(pathname);

  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const fetchData = (obj) => {
    const convertCity = obj?.citySelected
      ? addQuotesToString(obj?.citySelected)
      : undefined;
    const convertCountry = obj?.countrySelected
      ? addQuotesToString(obj?.countrySelected)
      : undefined;
    const convertContinent = obj?.continentSelected
      ? addQuotesToString(obj?.continentSelected)
      : undefined;
    const convertTech = obj?.techSelected
      ? addQuotesToString(obj?.techSelected)
      : undefined;
    const convertedDateStr = pastConf ? undefined : convertedDate;

    dispatch(setTodayDate(convertedDateStr));
    dispatch(
      fetchConferencesByAllFilter({
        citySelected: convertCity,
        countrySelected: convertCountry,
        continentSelected: convertContinent,
        techSelected: convertTech,
        convertedDate: convertedDateStr,
      })
    );
  };

  useEffect(() => {
    fetchAreaFilterFromURL(
      dispatch,
      setConferenceDataByUrl,
      dataFromURL,
      fetchData
    );
  }, []);

  useEffect(() => {
    fetchAreaFilterFromURL(
      dispatch,
      setConferenceDataByUrl,
      dataFromURL,
      fetchData
    );
  }, [pathname]);

  useEffect(() => {
    fetchAreaFilterFromURL(
      dispatch,
      setConferenceDataByUrl,
      dataFromURL,
      fetchData
    );
  }, [pastConf]);

  useEffect(() => {
    updateAreaURLAndData(CONFERENCES_URL, fetchData, {
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
    });
  }, [citySelected, countrySelected, continentSelected, techSelected]);

  const currentYear = currentDate.split("-")[0];

  return (
    <PageContainer>
      <Breadcrumb
        page="conferences"
        breadcrumbHandler={handleAreaBreadcrumb}
        setterFunc={setConferenceDataByUrl}
        clearFunc={clearConfFilters}
        URL={CONFERENCES_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Developers Conferences
      </h1>
      {!pastConf && (
        <p className="text-neutrals-800 font-[500] text-[25px] sm:text-[30px] lg:text-[40px]">
          for {currentYear}
        </p>
      )}
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        <span>
          A curated list of the {techSelected && <span>{techSelected}</span>}{" "}
          developer conferences
        </span>
        {citySelected && (
          <span>
            <span> in {citySelected}</span>
            {countrySelected && <span>, {countrySelected}</span>}
            {continentSelected && <span>, {continentSelected}</span>}
          </span>
        )}
        {!pastConf && <span> for {currentYear} and beyond</span>}
      </p>
      <AreaFilterBar
        page="conferences"
        pageState={conferences}
        clearFunc={clearConfFilters}
        showPastDate
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allConferences.length > 0 ? (
        <AreaTable
          data={allConferences}
          page="conferences"
          pageState={conferences}
          filterFunc={fetchConferencesByAllFilter}
        />
      ) : (
        status === "success" && <p>No conferences found!</p>
      )}
    </PageContainer>
  );
};

export default Conferences;
