"use client";
import { useDispatch } from "react-redux";
import DropdownWrapper from "../dropDownWrapper";
import tag from "@/assets/tag.svg";
import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";
import Image from "next/image";
import ClearBtn from "../clearBtn";

const AudienceFilterBar = ({ page, pageState, clearFunc }) => {
  const { langSelected, audienceSelected, tagSelected } = pageState;
  const dispatch = useDispatch();

  const isFilter =
    langSelected || audienceSelected || tagSelected ? true : false;

  const clearFilterHandler = () => {
    dispatch(clearFunc());
  };
  return (
    <div className="hidden xl:flex flex-col gap-2 md:flex-row md:justify-between items-center md:h-[48px] border border-indigos-op-100 rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <div className="flex items-center px-[8px]">
          <Image
            src={globe}
            alt="tag icon"
            className="text-neutrals-300 w-[18px] h-[18px]"
          />
          <DropdownWrapper page={page} title="Language" pageState={pageState} />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-100"></span>
        <div className="flex items-center px-[8px]">
          <Image
            src={group}
            alt="tag icon"
            className="text-neutrals-300 w-[18px] h-[18px]"
          />
          <DropdownWrapper page={page} title="Audience" pageState={pageState} />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-100"></span>
        <div className="flex items-center px-[8px]">
          <Image
            src={tag}
            alt="tag icon"
            className="text-neutrals-300 w-[16px] h-[16px]"
          />
          <DropdownWrapper page={page} title="Tags" pageState={pageState} />
        </div>
        {isFilter && (
          <div className="flex items-center">
            <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
            <ClearBtn clickHandler={clearFilterHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudienceFilterBar;
