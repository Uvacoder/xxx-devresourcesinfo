"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuotesToString } from "@/utils/utils";
import { getAreaByCity, getAreaByCountry } from "@/services/api/conferenceAPI";
import {
  setOtherByCity,
  setOtherByCountry,
} from "@/redux/features/conference/conferenceSlice";
import {
  setHackathonOtherByCity,
  setHackathonOtherByCountry,
} from "@/redux/features/hackathon/hackathonSlice";

const AreaDropDown = ({
  obj,
  categorySelected,
  handleDropDown,
  pageState,
  page,
}) => {
  const dispatch = useDispatch();

  const setAreaValue = async (id) => {
    const convertId = addQuotesToString(id);
    if (categorySelected?.name === "City") {
      const { data } = await getAreaByCity(convertId);
      if (page === "conferences") {
        dispatch(
          setOtherByCity({
            country: data?.country?.name,
            continent: data?.country?.continent?.name,
          })
        );
      } else if (page === "hackathons") {
        dispatch(
          setHackathonOtherByCity({
            country: data?.country?.name,
            continent: data?.country?.continent?.name,
          })
        );
      } else {
        return;
      }
    } else {
      const { data } = await getAreaByCountry(convertId);
      if (page === "conferences") {
        dispatch(setOtherByCountry(data?.continent?.name));
      } else if (page === "hackathons") {
        dispatch(setHackathonOtherByCountry(data?.continent?.name));
      } else {
        return;
      }
    }
    handleDropDown();
  };

  const clickHandler = (name) => {
    if (page === "conferences") {
      dispatch(categorySelected.toChangeAtt({ value: name, id: obj?.id }));
    } else if (page === "hackathons") {
      dispatch(
        categorySelected.toChangeHackathonAtt({ value: name, id: obj?.id })
      );
    } else {
      return;
    }

    if (
      categorySelected?.name === "City" ||
      categorySelected?.name === "Country"
    ) {
      setAreaValue(obj?.id);
    } else {
      handleDropDown();
    }
  };

  return (
    <div
      className={`text-[14px] font-[700] hover:bg-indigos-op-100 hover:text-primary-end p-[10px] cursor-pointer ${
        pageState[categorySelected?.isActiveValue] === obj?.name
          ? "text-primary-end bg-indigos-op-100"
          : "text-neutrals-600"
      }`}
      onClick={() => clickHandler(obj?.name)}
    >
      {obj?.name}
    </div>
  );
};

export default AreaDropDown;
