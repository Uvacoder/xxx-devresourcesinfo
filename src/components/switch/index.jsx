"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";
import { pastConfUpdate } from "@/redux/features/conference/conferenceSlice";
import { addQuotesToString } from "@/utils/utils";

const Switch = () => {
  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
    todayDate,
  } = useSelector(({ conferences }) => conferences);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(pastConf);

  const changeHandler = () => {
    let newCheckedValue = checked ? false : true;
    setChecked(newCheckedValue);
    dispatch(pastConfUpdate(newCheckedValue));
    getData(newCheckedValue);
  };

  const getData = (newCheckedValue) => {
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
    let convertedDate = newCheckedValue ? undefined : todayDate;
    dispatch(
      fetchConferencesByAllFilter({
        citySelected: convertCity,
        countrySelected: convertCountry,
        continentSelected: convertContinent,
        techSelected: convertTech,
        convertedDate,
      })
    );
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={() => changeHandler()}
        checked={pastConf}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
