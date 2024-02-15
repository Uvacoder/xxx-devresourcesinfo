"use client";
import React, { useEffect } from "react";
import ConferenceTable from "@/components/conferenceTable";
import ConferenceFilterBar from "@/components/conferenceFilterBar";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";
import {
  setConferenceDataByUrl,
  setStorageData,
  setTodayDate,
} from "@/redux/features/conference/conferenceSlice";
import PageContainer from "@/components/pageContainer";

const Conferences = ({ params: { name } }) => {
  const dispatch = useDispatch();

  const {
    allConferences,
    status,
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = useSelector(({ conferences }) => conferences);

  const currentDate = getCurrentDate();

  useEffect(() => {
    const localStorageResources =
      JSON.parse(localStorage.getItem("devResources")) ?? {};

    dispatch(setStorageData(localStorageResources?.conferences));

    const convertedDate = addQuotesToString(currentDate);

    const convertCity = localStorageResources?.conferences?.citySelected
      ? addQuotesToString(localStorageResources?.conferences?.citySelected)
      : undefined;
    const convertCountry = localStorageResources?.conferences?.countrySelected
      ? addQuotesToString(localStorageResources?.conferences?.countrySelected)
      : undefined;
    const convertContinent = localStorageResources?.conferences
      ?.continentSelected
      ? addQuotesToString(localStorageResources?.conferences?.continentSelected)
      : undefined;
    const convertTech = localStorageResources?.conferences?.techSelected
      ? addQuotesToString(localStorageResources?.conferences?.techSelected)
      : undefined;
    const convertedDateStr = pastConf ? undefined : convertedDate;

    dispatch(setTodayDate(convertedDateStr));

    console.log({
      citySelected: convertCity,
      countrySelected: convertCountry,
      continentSelected: convertContinent,
      techSelected: convertTech,
      convertedDate: convertedDateStr,
    });
    dispatch(
      fetchConferencesByAllFilter({
        citySelected: convertCity,
        countrySelected: convertCountry,
        continentSelected: convertContinent,
        techSelected: convertTech,
        convertedDate: convertedDateStr,
      })
    );
  }, []);

  useEffect(() => {
    if (citySelected && techSelected) {
      window.history.pushState(
        null,
        "",
        `/conferences/${techSelected}/${continentSelected}/${countrySelected}/${citySelected}`
      );
      dispatch(
        setConferenceDataByUrl({
          payload: {
            citySelected,
            countrySelected,
            continentSelected,
            techSelected,
          },
        })
      );
    } else if (countrySelected && techSelected) {
      window.history.pushState(
        null,
        "",
        `/conferences/${techSelected}/${continentSelected}/${countrySelected}`
      );
      dispatch(
        setConferenceDataByUrl({
          payload: {
            countrySelected,
            continentSelected,
            techSelected,
          },
        })
      );
    } else if (continentSelected && techSelected) {
      window.history.pushState(
        null,
        "",
        `/conferences/${techSelected}/${continentSelected}`
      );
      dispatch(
        setConferenceDataByUrl({
          payload: {
            continentSelected,
            techSelected,
          },
        })
      );
    } else if (techSelected) {
      window.history.pushState(null, "", `/conferences/${techSelected}`);
      dispatch(
        setConferenceDataByUrl({
          payload: {
            techSelected,
          },
        })
      );
    } else if (citySelected) {
      window.history.pushState(
        null,
        "",
        `/conferences/${continentSelected}/${countrySelected}/${citySelected}`
      );
      dispatch(
        setConferenceDataByUrl({
          payload: {
            citySelected,
            countrySelected,
            continentSelected,
          },
        })
      );
    } else if (countrySelected) {
      window.history.pushState(
        null,
        "",
        `/conferences/${continentSelected}/${countrySelected}`
      );
      dispatch(
        setConferenceDataByUrl({
          payload: {
            countrySelected,
            continentSelected,
          },
        })
      );
    } else if (continentSelected) {
      window.history.pushState(null, "", `/conferences/${continentSelected}`);
      dispatch(
        setConferenceDataByUrl({
          continentSelected,
        })
      );
    } else {
      return;
    }
  }, [citySelected, countrySelected, continentSelected, techSelected]);

  const currentYear = currentDate.split("-")[0];

  return (
    <PageContainer>
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] mt-[30px] lg:mt-[40px]">
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
      <ConferenceFilterBar />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allConferences.length > 0 ? (
        <ConferenceTable data={allConferences} />
      ) : (
        status === "success" && <p>No conferences found!</p>
      )}
    </PageContainer>
  );
};

export default Conferences;
