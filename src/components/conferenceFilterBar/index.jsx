"use client";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import DropdownWrapper from "../dropDownWrapper";
import Switch from "../switch";
import { useDispatch, useSelector } from "react-redux";
import { clearConfFilters } from "@/redux/features/conference/conferenceSlice";
import ClearBtn from "../clearBtn";

const ConferenceFilterBar = () => {
  const {
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = useSelector(({ conferences }) => conferences);
  const dispatch = useDispatch();

  const isFilter =
    pastConf ||
    citySelected ||
    countrySelected ||
    continentSelected ||
    techSelected
      ? true
      : false;

  const clearFilterHandler = () => {
    dispatch(clearConfFilters());
  };
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center md:h-[48px] border border-indigos-op-100 rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <span className="text-neutrals-300 pl-[8px]">
          <RiMapPin2Line className="w-[18px] h-[18px]" />
        </span>
        <div className="flex gap-[8px] items-center">
          <DropdownWrapper title="City" />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper title="Country" />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper title="Continent" />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
        <div className="flex items-center px-[8px]">
          <MdOutlineHandyman className="text-neutrals-300 w-[18px] h-[18px]" />
          <DropdownWrapper title="Technology" />
        </div>
        {isFilter && (
          <div className="flex items-center">
            <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
            <ClearBtn clickHandler={clearFilterHandler} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-[8px] mx-[16px] pr-[8px]">
        <Switch />
        <span className="text-[14px] text-neutrals-600 leading-[21px]">
          Show past conferences
        </span>
      </div>
    </div>
  );
};

export default ConferenceFilterBar;
