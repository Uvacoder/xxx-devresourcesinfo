"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";
import { addQuotesToString } from "@/utils/utils";
import { getAreaByCity, getAreaByCountry } from "@/services/api/conferenceAPI";
import {
  setOtherByCity,
  setOtherByCountry,
} from "@/redux/features/conference/conferenceSlice";

const ConferencesDropDown = ({
  obj,
  handleDropDownSelected,
  categorySelected,
  menuTitle,
  setShowModal,
}) => {
  const conferences = useSelector(({ conferences }) => conferences);
  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
    todayDate,
  } = useSelector(({ conferences }) => conferences);
  const dispatch = useDispatch();

  const getData = (dropDownSelected, continent, country) => {
    const convertCity =
      continent || country
        ? undefined
        : citySelected
        ? addQuotesToString(citySelected)
        : undefined;
    const convertCountry = country
      ? addQuotesToString(country)
      : countrySelected
      ? addQuotesToString(countrySelected)
      : undefined;
    const convertContinent = continent
      ? addQuotesToString(continent)
      : continentSelected
      ? addQuotesToString(continentSelected)
      : undefined;
    const convertTech = techSelected
      ? addQuotesToString(techSelected)
      : undefined;
    const convertedDate = pastConf ? undefined : todayDate;
    setShowModal((prev) => !prev);
    if (menuTitle === "technology") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: convertCity,
          countrySelected: convertCountry,
          continentSelected: convertContinent,
          techSelected: dropDownSelected,
          convertedDate,
        })
      );
    } else if (menuTitle === "city") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: dropDownSelected,
          countrySelected: convertCountry,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "country") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: convertCity,
          countrySelected: dropDownSelected,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "continent") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: convertCity,
          countrySelected: convertCountry,
          continentSelected: dropDownSelected,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else {
      return;
    }
  };

  const setAreaValue = async (id, convertStr) => {
    const convertId = addQuotesToString(id);
    if (categorySelected?.name === "City") {
      const { data } = await getAreaByCity(convertId);
      dispatch(
        setOtherByCity({
          country: data?.country?.name,
          continent: data?.country?.continent?.name,
        })
      );
      getData(convertStr, data?.country?.continent?.name, data?.country?.name);
    } else {
      const { data } = await getAreaByCountry(convertId);
      dispatch(setOtherByCountry(data?.continent?.name));
      getData(convertStr, data?.continent?.name);
    }
    // getData(convertStr);
  };

  const clickHandler = (e) => {
    const valueSelected = e.target.textContent;
    const convertStr = addQuotesToString(valueSelected);
    handleDropDownSelected(e);

    dispatch(
      categorySelected.toChangeAtt({ value: valueSelected, id: obj?.id })
    );

    if (
      categorySelected?.name === "City" ||
      categorySelected?.name === "Country"
    ) {
      setAreaValue(obj?.id, convertStr);
    } else {
      getData(convertStr);
    }
  };

  return (
    <div
      className={`text-[14px] font-[700] hover:bg-[#3129e714] hover:text-[#3129E7] p-[10px] ${
        conferences[categorySelected?.isActiveValue] === obj?.name
          ? "text-[#3129E7] bg-[#3129e714]"
          : "text-neutrals-600"
      }`}
      onClick={(e) => clickHandler(e)}
    >
      {obj?.name}
    </div>
  );
};

export default ConferencesDropDown;
