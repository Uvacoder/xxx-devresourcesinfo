"use client";
import React from "react";
import { useDispatch } from "react-redux";

const AudienceDropDown = ({
  obj,
  categorySelected,
  handleDropDown,
  pageState,
  page,
}) => {
  const dispatch = useDispatch();

  const clickHandler = (name) => {
    handleDropDown();
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
