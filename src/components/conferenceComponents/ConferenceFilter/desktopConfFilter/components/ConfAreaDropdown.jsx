import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAreaByCity, getAreaByCountry } from "@/services/api/conferenceAPI";
import { updateConferenceURL } from "@/utils/conferenceFunc";
import { addQuotesToString } from "@/utils/utils";

const ConfAreaDropdown = ({
  obj,
  categorySelected,
  menuTitle,
  handleDropDown,
  stateObj,
}) => {
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

  const updateTechAndContinentUrl = (textSelected) => {
    handleDropDown();
    if (menuTitle === "technology") {
      const updatedState = {
        ...stateObj,
        techSelected: textSelected,
      };
      const url = updateConferenceURL(updatedState);

      const queryParams = {
        continent: stateObj?.continentSelected,
        country: stateObj?.countrySelected,
        city: stateObj?.citySelected,
        tech: textSelected,
        mode: stateObj?.pastConf,
      };

      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else if (menuTitle === "continent") {
      const updatedState = {
        ...stateObj,
        citySelected: "",
        countrySelected: "",
        continentSelected: textSelected,
      };
      const url = updateConferenceURL(updatedState);

      const queryParams = {
        continent: textSelected,
        country: "",
        city: "",
        tech: stateObj?.techSelected,
        mode: stateObj?.pastConf,
      };

      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else {
      return;
    }
  };

  const updateCityCountryUrl = async (id, textSelected) => {
    const convertId = addQuotesToString(id);
    if (categorySelected?.name === "City") {
      const { data } = await getAreaByCity(convertId);
      const updatedState = {
        ...stateObj,
        citySelected: textSelected,
        countrySelected: data?.country?.name,
        continentSelected: data?.country?.continent?.name,
      };
      const url = updateConferenceURL(updatedState);

      const queryParams = {
        continent: data?.country?.continent?.name,
        country: data?.country?.name,
        city: textSelected,
        tech: stateObj?.techSelected,
        mode: stateObj?.pastConf,
      };

      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else {
      const { data } = await getAreaByCountry(convertId);

      const updatedState = {
        ...stateObj,
        citySelected: "",
        countrySelected: textSelected,
        continentSelected: data?.continent?.name
      };

      const url = updateConferenceURL(updatedState);

      const queryParams = {
        continent: data?.continent?.name,
        country: textSelected,
        city: "",
        tech: stateObj?.techSelected,
        mode: stateObj?.pastConf,
      };

      router.push(`${url}/?${createQueryString(queryParams)}`);
    }
    handleDropDown();
  };

  const clickHandler = (textSelected) => {
    if (
      categorySelected?.name === "City" ||
      categorySelected?.name === "Country"
    ) {
      updateCityCountryUrl(obj?.id, textSelected);
    } else {
      updateTechAndContinentUrl(textSelected);
    }
  };

  return (
    <div
      className={`text-[14px] font-[700] hover:bg-indigos-op-100 hover:text-primary-end p-[10px] cursor-pointer ${
        stateObj[categorySelected?.isActiveValue] === obj?.name
          ? "text-primary-end bg-indigos-op-100"
          : "text-neutrals-600"
      }`}
      onClick={() => clickHandler(obj?.name)}
    >
      {obj?.name}
    </div>
  );
};

export default ConfAreaDropdown;
