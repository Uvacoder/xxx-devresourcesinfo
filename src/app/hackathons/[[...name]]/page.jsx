"use client";
import React, { useEffect } from "react";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "@/components/pageContainer";
import { HACKATHONS_URL, DEV_RESOURCES } from "@/utils/constants";
import AreaFilterBar from "@/components/areaFilterBar";
import AreaTable from "@/components/areaTable";
import { fetchHackathonsByAllFilter } from "@/redux/features/hackathon/action";
import {
  clearHackathonFilters,
  setHackathonDataByUrl,
  setHackathonStorageData,
  setHackathonTodayDate,
} from "@/redux/features/hackathon/hackathonSlice";
import Breadcrumb from "@/components/breadcrumb";

const Hackathons = ({ params: { name } }) => {
  const dispatch = useDispatch();
  const hackathons = useSelector(({ hackathons }) => hackathons);
  const {
    allHackathons,
    status,
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = hackathons;

  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const fetchData = () => {
    const localStorageResources =
      JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};

    dispatch(setHackathonStorageData(localStorageResources?.hackathons));

    const convertCity = localStorageResources?.hackathons?.citySelected
      ? addQuotesToString(localStorageResources?.hackathons?.citySelected)
      : undefined;
    const convertCountry = localStorageResources?.hackathons?.countrySelected
      ? addQuotesToString(localStorageResources?.hackathons?.countrySelected)
      : undefined;
    const convertContinent = localStorageResources?.hackathons
      ?.continentSelected
      ? addQuotesToString(localStorageResources?.hackathons?.continentSelected)
      : undefined;
    const convertTech = localStorageResources?.hackathons?.techSelected
      ? addQuotesToString(localStorageResources?.hackathons?.techSelected)
      : undefined;
    const convertedDateStr = pastConf ? undefined : convertedDate;

    dispatch(setHackathonTodayDate(convertedDateStr));

    dispatch(
      fetchHackathonsByAllFilter({
        citySelected: convertCity,
        countrySelected: convertCountry,
        continentSelected: convertContinent,
        techSelected: convertTech,
        convertedDate: convertedDateStr,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (citySelected && techSelected) {
      window.history.pushState(
        null,
        "",
        `${HACKATHONS_URL}/${continentSelected}/${countrySelected}/${citySelected}`
      );
      dispatch(
        setHackathonDataByUrl({
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
        `${HACKATHONS_URL}/${continentSelected}/${countrySelected}`
      );
      dispatch(
        setHackathonDataByUrl({
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
        `${HACKATHONS_URL}/${continentSelected}`
      );
      dispatch(
        setHackathonDataByUrl({
          payload: {
            continentSelected,
            techSelected,
          },
        })
      );
    } else if (techSelected) {
      dispatch(
        setHackathonDataByUrl({
          payload: {
            techSelected,
          },
        })
      );
    } else if (citySelected) {
      window.history.pushState(
        null,
        "",
        `${HACKATHONS_URL}/${continentSelected}/${countrySelected}/${citySelected}`
      );
      dispatch(
        setHackathonDataByUrl({
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
        `${HACKATHONS_URL}/${continentSelected}/${countrySelected}`
      );
      dispatch(
        setHackathonDataByUrl({
          payload: {
            countrySelected,
            continentSelected,
          },
        })
      );
    } else if (continentSelected) {
      window.history.pushState(
        null,
        "",
        `${HACKATHONS_URL}/${continentSelected}`
      );
      dispatch(
        setHackathonDataByUrl({
          continentSelected,
        })
      );
    } else {
      fetchData();
      return;
    }
  }, [citySelected, countrySelected, continentSelected, techSelected]);



  return (
    <PageContainer>
      <Breadcrumb />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Hackathons
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        <span>
          A curated list of the {techSelected && <span>{techSelected}</span>}{" "}
           hackathons
        </span>
        {citySelected && (
          <span>
            <span> in {citySelected}</span>
            {countrySelected && <span>, {countrySelected}</span>}
            {continentSelected && <span>, {continentSelected}</span>}
          </span>
        )}
      </p>
      <AreaFilterBar
        page="hackathons"
        pageState={hackathons}
        clearFunc={clearHackathonFilters}
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allHackathons.length > 0 ? (
        <AreaTable
          data={allHackathons}
          page="hackathons"
          pageState={hackathons}
          filterFunc={fetchHackathonsByAllFilter}
        />
      ) : (
        status === "success" && <p>No hackathons found!</p>
      )}
    </PageContainer>
  );
};

export default Hackathons;
