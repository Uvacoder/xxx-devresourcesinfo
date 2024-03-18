"use client";
import React, { useEffect } from "react";
import {
  getCurrentDate,
  addQuotesToString,
  extractDataFromURL,
} from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "@/components/pageContainer";
import { HACKATHONS_URL } from "@/utils/constants";
import AreaFilterBar from "@/components/areaFilterBar";
import AreaTable from "@/components/areaTable";
import Breadcrumb from "@/components/breadcrumb";
import { fetchHackathonsByAllFilter } from "@/redux/features/hackathon/action";
import {
  clearHackathonFilters,
  setHackathonDataByUrl,
  setHackathonTodayDate,
} from "@/redux/features/hackathon/hackathonSlice";
import { usePathname } from "next/navigation";
import {
  fetchAreaFilterFromURL,
  handleAreaBreadcrumb,
  updateAreaURLAndData,
} from "@/utils/urlFunc";
import MobileFilterBar from "@/components/mobileFilterBar";
import NoDataFound from "@/components/noDataFound";
import Loader from "@/components/loader";
import AreaPagination from "@/components/pagination/AreaPagination";

const Hackathons = ({ searchParams }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const hackathons = useSelector(({ hackathons }) => hackathons);
  const {
    allHackathons,
    status,
    pastHackathons,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = hackathons;

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
    const convertedDateStr = pastHackathons ? undefined : convertedDate;
    const convertEndCursor = searchParams?.hasEndCursor
      ? addQuotesToString(searchParams?.hasEndCursor)
      : "";
    const convertStartCursor = searchParams?.hasStartCursor
      ? addQuotesToString(searchParams?.hasStartCursor)
      : "";

    const getPage = searchParams?.page ?? "next";

    dispatch(setHackathonTodayDate(convertedDateStr));

    dispatch(
      fetchHackathonsByAllFilter({
        citySelected: convertCity,
        countrySelected: convertCountry,
        continentSelected: convertContinent,
        techSelected: convertTech,
        convertedDate: convertedDateStr,
        endCursor: convertEndCursor,
        startCursor: convertStartCursor,
        getPage,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchAreaFilterFromURL(
      dispatch,
      setHackathonDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname, searchParams?.hasEndCursor]);

  useEffect(() => {
    updateAreaURLAndData(HACKATHONS_URL, {
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
    });
  }, [citySelected, countrySelected, continentSelected, techSelected]);

  return (
    <PageContainer>
      <Breadcrumb
        page="hackathons"
        breadcrumbHandler={handleAreaBreadcrumb}
        setterFunc={setHackathonDataByUrl}
        clearFunc={clearHackathonFilters}
        URL={HACKATHONS_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Hackathons
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
        <span>
          A curated list of {techSelected && <span>{techSelected}</span>}{" "}
          hackathons
        </span>
        {citySelected ? (
          <>
            <> in {citySelected}</>
            {countrySelected && <>, {countrySelected}</>}
            {continentSelected && <>, {continentSelected}</>}
          </>
        ) : countrySelected ? (
          <>
            <> in {countrySelected}</>
            {continentSelected && <>, {continentSelected}</>}
          </>
        ) : (
          continentSelected && (
            <>
              <> in {continentSelected}</>
            </>
          )
        )}
      </p>
      <AreaFilterBar
        page="hackathons"
        pageState={hackathons}
        clearFunc={clearHackathonFilters}
      />
      <MobileFilterBar
        page="hackathons"
        pageState={hackathons}
        clearFunc={clearHackathonFilters}
        area
      />
      {allHackathons.length > 0 ? (
        <AreaTable
          data={allHackathons}
          page="hackathons"
          pageState={hackathons}
          filterFunc={fetchHackathonsByAllFilter}
        />
      ) : status === "success" ? (
        <NoDataFound title="hackathons" />
      ) : (
        status !== "error" && <Loader />
      )}
      <AreaPagination stateObj={hackathons} URL={HACKATHONS_URL} />
    </PageContainer>
  );
};

export default Hackathons;
