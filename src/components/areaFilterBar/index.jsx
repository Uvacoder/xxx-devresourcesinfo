"use client";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import DropdownWrapper from "../dropDownWrapper";
import Switch from "../switch";
import { useDispatch } from "react-redux";
import ClearBtn from "../clearBtn";

const AreaFilterBar = ({ page, pageState, clearFunc, showPastDate }) => {
  const {
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = pageState;
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
    dispatch(clearFunc());
  };
  return (
    <div className="hidden xl:flex flex-wrap gap-2 justify-between items-center border border-indigos-op-100 rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <span className="text-neutrals-300 pl-[8px]">
          <RiMapPin2Line className="w-[18px] h-[18px]" />
        </span>
        <div className="flex gap-[8px] items-center">
          <DropdownWrapper title="City" page={page} pageState={pageState} />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper title="Country" page={page} pageState={pageState} />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper
            title="Continent"
            page={page}
            pageState={pageState}
          />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
        <div className="flex items-center px-[8px]">
          <MdOutlineHandyman className="text-neutrals-300 w-[18px] h-[18px]" />
          <DropdownWrapper
            title="Technology"
            page={page}
            pageState={pageState}
          />
        </div>
        {isFilter && (
          <div className="flex items-center">
            <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
            <ClearBtn clickHandler={clearFilterHandler} />
          </div>
        )}
      </div>
      {showPastDate && (
        <div className="flex items-center gap-[8px] mx-[16px] pr-[8px] p-[6px]">
          <Switch />
          <span className="text-[14px] text-neutrals-600 leading-[21px]">
            Show past {page}
          </span>
        </div>
      )}
    </div>
  );
};

export default AreaFilterBar;
