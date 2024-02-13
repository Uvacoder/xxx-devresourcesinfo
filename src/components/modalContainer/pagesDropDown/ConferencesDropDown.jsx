"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";
import { addQuotesToString } from "@/utils/utils";

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

  const getData = (dropDownSelected) => {
    const convertCity = citySelected
      ? addQuotesToString(citySelected)
      : undefined;
    const convertCountry = countrySelected
      ? addQuotesToString(countrySelected)
      : undefined;
    const convertContinent = continentSelected
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

  const clickHandler = (e) => {
    const convertStr = addQuotesToString(e.target.textContent);
    handleDropDownSelected(e);
    getData(convertStr);
    dispatch(categorySelected.toChangeAtt(e.target.textContent));
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
