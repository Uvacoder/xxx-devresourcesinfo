import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ClearBtn from "@/components/clearBtn";
import Switch from "@/components/switch";
import ConfAccordionItem from "./ConfAccordionItem";
import { CONFERENCES_URL } from "@/utils/constants";

const ConfAccordion = ({ stateObj }) => {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState(0);
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

  const handleAccordion = (index, active) => {
    if (active) {
      setOpenAccordion(0);
    } else {
      if (index === 1) {
        setOpenAccordion(1);
      } else if (index === 2) {
        setOpenAccordion(2);
      } else if (index === 3) {
        setOpenAccordion(3);
      } else if (index === 4) {
        setOpenAccordion(4);
      } else {
        return;
      }
    }
  };
  return (
    <div className="flex flex-col gap-[4px] mt-[10px]">
      <div>
        <div className="w-full flex flex-col gap-[4px]">
          <ConfAccordionItem
            title="City"
            openAccordion={openAccordion}
            index={1}
            handleAccordion={handleAccordion}
            stateObj={stateObj}
          />
          <ConfAccordionItem
            title="Country"
            openAccordion={openAccordion}
            index={2}
            handleAccordion={handleAccordion}
            stateObj={stateObj}
          />
          <ConfAccordionItem
            title="Continent"
            openAccordion={openAccordion}
            index={3}
            handleAccordion={handleAccordion}
            stateObj={stateObj}
          />
        </div>
      </div>

      <div
        className={`flex border border-x-0 border-t py-1 border-neutrals-200 ${
          isFilter ? "border-b" : "border-b-0"
        }`}
      >
        <div className="w-full">
          <ConfAccordionItem
            title="Technology"
            openAccordion={openAccordion}
            index={4}
            handleAccordion={handleAccordion}
            stateObj={stateObj}
          />
        </div>
      </div>
      {isFilter && (
        <div>
          <ClearBtn clickHandler={clickHandler} />
        </div>
      )}

      {/*<div className="flex items-center gap-[8px] mt-[4px]">
        <Switch stateObj={stateObj} />
        <span className="text-[14px] text-neutrals-600 leading-[21px]">
          Show past conferences
        </span>
    </div>*/}
    </div>
  );
};

export default ConfAccordion;
