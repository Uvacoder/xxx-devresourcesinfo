"use client";
import { useRouter } from "next/navigation";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import { CONFERENCES_URL } from "@/utils/constants";
import Switch from "@/components/switch";
import ClearBtn from "@/components/clearBtn";
import DropdownWrapper from "./components/DropdownWrapper";

const DesktopConfFilter = ({ stateObj }) => {
  const router = useRouter();
  const {
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = stateObj;

  const isFilter =
    pastConf ||
    citySelected ||
    countrySelected ||
    continentSelected ||
    techSelected
      ? true
      : false;

  const clickHandler = () => {
    router.push(`${CONFERENCES_URL}`);
  };
  return (
    <div className="hidden xl:flex flex-wrap gap-2 justify-between items-center border border-indigos-op-100 rounded-[8px] mb-[10px]">
      <div className="flex items-center p-1 pl-[12px]">
        <span className="text-neutrals-300 pl-[8px]">
          <RiMapPin2Line className="w-[18px] h-[18px]" />
        </span>
        <div className="flex gap-[8px] items-center">
          <DropdownWrapper title="City" stateObj={stateObj} />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper title="Country" stateObj={stateObj} />
          <span className="w-[1px] h-[18px] bg-neutrals-100"></span>
          <DropdownWrapper title="Continent" stateObj={stateObj} />
        </div>
        <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
        <div className="flex items-center px-[8px]">
          <MdOutlineHandyman className="text-neutrals-300 w-[18px] h-[18px]" />
          <DropdownWrapper title="Technology" stateObj={stateObj} />
        </div>
        {isFilter && (
          <div className="flex items-center">
            <span className="w-[1px] h-[24px] mx-[8px] bg-neutrals-200"></span>
            <ClearBtn clickHandler={clickHandler} />
          </div>
        )}
      </div>

      {/*<div className="flex items-center gap-[8px] mx-[16px] pr-[8px] p-[6px]">
        <Switch stateObj={stateObj} />
        <span className="text-[14px] text-neutrals-600 leading-[21px]">
          Show past conferences
        </span>
      </div>*/}
    </div>
  );
};

export default DesktopConfFilter;
