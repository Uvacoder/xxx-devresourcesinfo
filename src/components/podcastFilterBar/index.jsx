"use client";
import DropdownWrapper from "../dropDownWrapper";
import tag from "@/assets/tag.svg";
import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearPodcastFilters } from "@/redux/features/podcast/podcastSlice";
import ClearBtn from "../clearBtn";

const PodcastFilterBar = () => {
  const { langSelected, audienceSelected, tagSelected } = useSelector(
    ({ podcasts }) => podcasts
  );
  const dispatch = useDispatch();

  const isFilter =
    langSelected || audienceSelected || tagSelected ? true : false;

  const clearFilterHandler = () => {
    dispatch(clearPodcastFilters());
  };
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center md:h-[48px] border border-[#3129e714] rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <div className="flex items-center px-[8px]">
          <Image
            src={globe}
            alt="tag icon"
            className="text-neutrals-300 w-[18px] h-[18px]"
          />
          <DropdownWrapper title="Language" />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-[#ECECF2]"></span>
        <div className="flex items-center px-[8px]">
          <Image
            src={group}
            alt="tag icon"
            className="text-neutrals-300 w-[18px] h-[18px]"
          />
          <DropdownWrapper title="Audience" />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-[#ECECF2]"></span>
        <div className="flex items-center px-[8px]">
          <Image
            src={tag}
            alt="tag icon"
            className="text-neutrals-300 w-[16px] h-[16px]"
          />
          <DropdownWrapper title="Tags" />
        </div>
        {isFilter && <ClearBtn clickHandler={clearFilterHandler} />}
      </div>
    </div>
  );
};

export default PodcastFilterBar;
