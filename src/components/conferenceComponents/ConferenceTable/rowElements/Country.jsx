"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { getAreaByCountry } from "@/services/api/conferenceAPI";
import { updateConferenceURL } from "@/utils/conferenceFunc";
import { addQuotesToString } from "@/utils/utils";

const Country = ({ node, stateObj }) => {
  const router = useRouter();

  const createQueryString = useCallback((queryParams) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(queryParams)) {
      if (value !== "") {
        params.set(name, value);
      }
    }
    return params.toString();
  }, []);

  const clickHandler = async (selectedCountryName, id) => {
    const convertId = addQuotesToString(id);
    const { data } = await getAreaByCountry(convertId);

    const updatedState = {
      ...stateObj,
      citySelected: "",
      countrySelected: selectedCountryName,
      continentSelected: data?.continent?.name,
    };

    const url = updateConferenceURL(updatedState);

    const queryParams = {
      continent: data?.continent?.name,
      country: selectedCountryName,
      city: "",
      tech: stateObj?.techSelected,
      mode: stateObj?.pastConf,
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  return (
    <span
      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
      onClick={() => clickHandler(node?.country[0]?.name, node?.country[0]?.id)}
    >
      {node?.country[0]?.name}
    </span>
  );
};

export default Country;
