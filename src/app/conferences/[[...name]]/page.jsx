"use client";
import React, { Suspense } from "react";
import PageContainer from "@/components/pageContainer";
import ConferenceTable from "@/components/conferenceComponents/ConferenceTable";
import { getConferenceByAllFilters } from "@/services/api/conferenceAPI";
import { addQuotesToString, getCurrentDate } from "@/utils/utils";
import ConfBreadcrumb from "@/components/conferenceComponents/ConfBreadcrumb";
import NoDataFound from "@/components/noDataFound";
import DesktopConfFilter from "@/components/conferenceComponents/ConferenceFilter/desktopConfFilter";
import MobileConfFilter from "@/components/conferenceComponents/ConferenceFilter/mobileConfFilter";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";

const Conferences = async ({ searchParams }) => {
  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  var stateFetched = {
    citySelected: searchParams?.city ?? "",
    countrySelected: searchParams?.country ?? "",
    continentSelected: searchParams?.continent ?? "",
    techSelected: searchParams?.tech ?? "",
    pastConf: searchParams?.mode ?? "",
    hasStartCursor: searchParams?.hasStartCursor ?? "",
    hasEndCursor: searchParams?.hasEndCursor ?? "",
    hasPreviousPage: searchParams?.hasPreviousPage ?? false,
    hasNextPage: searchParams?.hasNextPage ?? true,
    page: searchParams?.page ?? "next",
  };
  const router = usePathname();
  let params = router.split("/").filter((param) => param !== "");

  if (!stateFetched.techSelected && params.length > 1) {
    stateFetched.techSelected = decodeURI(params[1]);
  }
  if (!stateFetched.continentSelected && params.length > 2) {
    stateFetched.continentSelected = decodeURI(params[2]);
  }
  if (!stateFetched.countrySelected && params.length > 3) {
    stateFetched.countrySelected = decodeURI(params[3]);
  }
  if (!stateFetched.citySelected && params.length > 4) {
    stateFetched.citySelected = decodeURI(params[4]);
  }

  if (stateFetched.techSelected==="all") {
    stateFetched.techSelected = "";
  }
  
  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
  } = stateFetched;

  const convertTech = stateFetched?.techSelected
    ? addQuotesToString(stateFetched?.techSelected)
    : undefined;
  const convertCity = stateFetched?.citySelected
    ? addQuotesToString(stateFetched?.citySelected)
    : undefined;
  const convertCountry = stateFetched?.countrySelected
    ? addQuotesToString(stateFetched?.countrySelected)
    : undefined;
  const convertContinent = stateFetched?.continentSelected
    ? addQuotesToString(stateFetched?.continentSelected)
    : undefined;

  const convertedDateStr =
    searchParams?.mode === "past" ? undefined : convertedDate;

  const convertEndCursor = stateFetched?.hasEndCursor
    ? addQuotesToString(stateFetched?.hasEndCursor)
    : "";
  const convertStartCursor = stateFetched?.hasStartCursor
    ? addQuotesToString(stateFetched?.hasStartCursor)
    : "";

  const getPage = stateFetched?.page;

  const allConferences = await getConferenceByAllFilters(
    convertCity,
    convertCountry,
    convertContinent,
    convertTech,
    convertedDateStr,
    convertEndCursor,
    convertStartCursor,
    getPage
  );

  const stateObj = {
    ...stateFetched,
    hasStartCursor: allConferences?.hasStartCursor,
    hasEndCursor: allConferences?.hasEndCursor,
    hasPreviousPage: allConferences?.hasPreviousPage.toString(),
    hasNextPage: allConferences?.hasNextPage.toString(),
  };

  const currentYear = currentDate.split("-")[0];

  return (
    <PageContainer>
      <ConfBreadcrumb stateObj={stateObj} />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Developer Conferences
      </h1>
      {pastConf !== "past" && (
        <p className="text-neutrals-800 font-[500] text-[25px] sm:text-[30px] lg:text-[40px]">
          for {currentYear}
        </p>
      )}
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
        <>
          A curated list of the {techSelected && <>{techSelected}</>} developer
          conferences
        </>
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
        {pastConf !== "past" && <> for {currentYear} and beyond</>}
      </p>

      <DesktopConfFilter stateObj={stateObj} />
      <MobileConfFilter stateObj={stateObj} />
      <Suspense fallback={<Loader />}>
        {allConferences?.data.length > 0 ? (
          <ConferenceTable data={allConferences?.data} stateObj={stateObj} />
        ) : (
          <NoDataFound title="conferences" />
        )}
      </Suspense>
    </PageContainer>
  );
};

export default Conferences;
