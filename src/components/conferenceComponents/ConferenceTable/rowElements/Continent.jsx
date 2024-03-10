"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { updateConferenceURL } from "@/utils/conferenceFunc";

const Continent = ({ node, stateObj }) => {
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

  const clickHandler = async (selectedContinentName) => {
    const updatedState = {
      ...stateObj,
      citySelected: "",
      countrySelected: "",
      continentSelected: selectedContinentName,
    };
    const url = updateConferenceURL(updatedState);

    const queryParams = {
      continent: selectedContinentName,
      country: "",
      city: "",
      tech: stateObj?.techSelected,
      mode: stateObj?.pastConf,
      hasStartCursor: stateObj?.hasStartCursor,
      hasEndCursor: stateObj?.hasEndCursor,
      page: stateObj?.page,
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  return (
    <span
      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
      onClick={() => clickHandler(node?.continent[0]?.name)}
    >
      { node?.continent[0]?.name}
    </span>
  );
};

export default Continent;
