"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuotesToString } from "@/utils/utils";

const AudienceDropDown = ({
  obj,
  categorySelected,
  menuTitle,
  handleDropDown,
  allFilterFunc,
  pageState,
  page,
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
    handleDropDown();
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
    if (page === "podcasts") {
      dispatch(categorySelected.toChangeAtt(name));
    } else if (page === "blogs") {
      dispatch(categorySelected.toChangeBlogAtt(name));
    } else if (page === "newsletters") {
      dispatch(categorySelected.toChangeNewsAtt(name));
    } else if (page === "youtube") {
      dispatch(categorySelected.toChangeYoutubeAtt(name));
    } else {
      return;
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

export default AudienceDropDown;
