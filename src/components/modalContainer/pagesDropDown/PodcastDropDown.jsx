"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuotesToString } from "@/utils/utils";
import { fetchPodcastByAllFilter } from "@/redux/features/podcast/action";

const PodcastDropDown = ({
  obj,
  handleDropDownSelected,
  categorySelected,
  menuTitle,
  setShowModal,
}) => {
  const podcasts = useSelector(({ podcasts }) => podcasts);
  const { langSelected, audienceSelected, tagSelected } = useSelector(
    ({ podcasts }) => podcasts
  );
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
        fetchPodcastByAllFilter({
          langSelected: dropDownSelected,
          audienceSelected: convertAudience,
          tagSelected: convertTag,
        })
      );
    } else if (menuTitle === "audience") {
      dispatch(
        fetchPodcastByAllFilter({
          langSelected: convertLang,
          audienceSelected: dropDownSelected,
          tagSelected: convertTag,
        })
      );
    } else {
      dispatch(
        fetchPodcastByAllFilter({
          langSelected: convertLang,
          audienceSelected: convertAudience,
          tagSelected: dropDownSelected,
        })
      );
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
      className={`text-[14px] font-[700] hover:bg-indigos-100 hover:text-primary-end p-[10px] ${
        podcasts[categorySelected?.isActiveValue] === obj?.name
          ? "text-primary-end bg-indigos-100"
          : "text-neutrals-600"
      }`}
      onClick={(e) => clickHandler(e)}
    >
      {obj?.name}
    </div>
  );
};

export default PodcastDropDown;
