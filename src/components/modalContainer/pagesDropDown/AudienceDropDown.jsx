"use client";
import React from "react";
import { useDispatch} from "react-redux";
import { addQuotesToString } from "@/utils/utils";

const AudienceDropDown = ({
  obj,
  categorySelected,
  menuTitle,
  setShowModal,
  allFilterFunc,
  pageState,
}) => {
  const { langSelected, audienceSelected, tagSelected } = pageState;

  const dispatch = useDispatch();

  const getData = (dropDownSelected) => {
    const convertLang = langSelected
      ? addQuotesToString(langSelected)
      : undefined;
    const convertAudience = audienceSelected
      ? addQuotesToString(audienceSelected)
      : undefined;
    const convertTag = tagSelected ? addQuotesToString(tagSelected) : undefined;
    setShowModal((prev) => !prev);
    if (menuTitle === "language") {
      dispatch(
        allFilterFunc({
          langSelected: dropDownSelected,
          audienceSelected: convertAudience,
          tagSelected: convertTag,
        })
      );
    } else if (menuTitle === "audience") {
      dispatch(
        allFilterFunc({
          langSelected: convertLang,
          audienceSelected: dropDownSelected,
          tagSelected: convertTag,
        })
      );
    } else {
      dispatch(
        allFilterFunc({
          langSelected: convertLang,
          audienceSelected: convertAudience,
          tagSelected: dropDownSelected,
        })
      );
    }
  };

  const clickHandler = (name) => {
    const convertStr = addQuotesToString(name);
    getData(convertStr);
    dispatch(categorySelected.toChangeAtt(name));
  };
  return (
    <div
      className={`text-[14px] font-[700] hover:bg-indigos-op-100 hover:text-primary-end p-[10px] cursor-pointer ${
        pageState[categorySelected?.isActiveValue] === obj?.name
          ? "text-primary-end bg-indigos-100"
          : "text-neutrals-600"
      }`}
      onClick={() => clickHandler(obj?.name)}
    >
      {obj?.name}
    </div>
  );
};

export default AudienceDropDown;
