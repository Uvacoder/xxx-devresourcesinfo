import React from "react";
import PageContainer from "@/components/pageContainer";
import ConferenceTable from "@/components/conferenceComponents/ConferenceTable";
import { getConferenceByAllFilters } from "@/services/api/conferenceAPI";
import { addQuotesToString, getCurrentDate } from "@/utils/utils";

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
  console.log({ stateObj });
  return (
    <PageContainer>
      <ConferenceTable data={allConferences?.data} stateObj={stateObj} />
    </PageContainer>
  );
};

export default Conferences;
