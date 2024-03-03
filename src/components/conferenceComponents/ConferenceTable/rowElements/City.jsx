"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { getAreaByCity } from "@/services/api/conferenceAPI";
import { updateConferenceURL } from "@/utils/conferenceFunc";
import { addQuotesToString } from "@/utils/utils";

const City = ({ node, stateObj }) => {
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

  const clickHandler = async (selectedCityName, id) => {
    const convertId = addQuotesToString(id);
    const { data } = await getAreaByCity(convertId);

    const updatedState = {
      ...stateObj,
      citySelected: selectedCityName,
      countrySelected: data?.country?.name,
      continentSelected: data?.country?.continent?.name,
    };
    const url = updateConferenceURL(updatedState);

    const queryParams = {
      continent: data?.country?.continent?.name,
      country: data?.country?.name,
      city: selectedCityName,
      tech: stateObj?.techSelected,
      mode: stateObj?.pastConf,
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  return (
    <span
      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
      onClick={() => clickHandler(node?.city?.name, node?.city?.id)}
    >
      {node?.city?.name}
    </span>
  );
};

export default City;
