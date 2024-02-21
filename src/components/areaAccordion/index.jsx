"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiMapPin2Line } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import AccordionItem from "./accordionItem";
import ClearBtn from "../clearBtn";
import Switch from "../switch";

const AreaAccordion = ({ page, pageState, clearFunc, showPastDate }) => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const dispatch = useDispatch();
  const {
    pastConf,
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
  } = pageState;

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
      <div className="flex">
        <span className="text-neutrals-300 mt-[5px]">
          <RiMapPin2Line className="w-[18px] h-[18px]" />
        </span>
        <div className="w-full flex flex-col gap-[4px]">
          <AccordionItem
            page={page}
            title="City"
            pageState={pageState}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
            index={1}
            handleAccordion={handleAccordion}
          />
          <AccordionItem
            page={page}
            title="Country"
            pageState={pageState}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
            index={2}
            handleAccordion={handleAccordion}
          />
          <AccordionItem
            page={page}
            title="Continent"
            pageState={pageState}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
            index={3}
            handleAccordion={handleAccordion}
          />
        </div>
      </div>

      <div
        className={`flex border border-x-0 border-t py-1 border-neutrals-200 ${
          !showPastDate && (isFilter ? "border-b" : "border-b-0")
        }`}
      >
        <span className="text-neutrals-300 mt-[5px]">
          <MdOutlineHandyman className="w-[18px] h-[18px]" />
        </span>
        <div className="w-full">
          <AccordionItem
            page={page}
            title="Technology"
            pageState={pageState}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
            index={4}
            handleAccordion={handleAccordion}
          />
        </div>
      </div>
      {isFilter && (
        <div>
          <ClearBtn clickHandler={clearFilterHandler} />
        </div>
      )}
      {showPastDate && (
        <div className="flex items-center gap-[8px] mt-[4px]">
          <Switch />
          <span className="text-[14px] text-neutrals-600 leading-[21px]">
            Show past {page}
          </span>
        </div>
      )}
    </div>
  );
};

export default AreaAccordion;
