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

const Conferences = async ({ searchParams }) => {
  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const stateObj = {
    citySelected: searchParams?.city ?? "",
    countrySelected: searchParams?.country ?? "",
    continentSelected: searchParams?.continent ?? "",
    techSelected: searchParams?.tech ?? "",
    pastConf: searchParams?.mode ?? "",
  };

  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
  } = stateObj;

  const convertCity = stateObj?.citySelected
    ? addQuotesToString(stateObj?.citySelected)
    : undefined;
  const convertCountry = stateObj?.countrySelected
    ? addQuotesToString(stateObj?.countrySelected)
    : undefined;
  const convertContinent = stateObj?.continentSelected
    ? addQuotesToString(stateObj?.continentSelected)
    : undefined;
  const convertTech = stateObj?.techSelected
    ? addQuotesToString(stateObj?.techSelected)
    : undefined;

  const convertedDateStr =
    searchParams?.mode === "past" ? undefined : convertedDate;

  const allConferences = await getConferenceByAllFilters(
    convertCity,
    convertCountry,
    convertContinent,
    convertTech,
    convertedDateStr
  );

  const currentYear = currentDate.split("-")[0];

  return (
    <PageContainer>
      <ConfBreadcrumb stateObj={stateObj} />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Developers Conferences
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
