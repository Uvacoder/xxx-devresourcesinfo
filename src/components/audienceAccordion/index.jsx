import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import AccordionItem from "./accordionItem";
import ClearBtn from "../clearBtn";
import tag from "@/assets/tag.svg";
import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";

const AudienceAccordion = ({ page, pageState, clearFunc }) => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const { langSelected, audienceSelected, tagSelected } = pageState;
  const dispatch = useDispatch();

  const isFilter =
    langSelected || audienceSelected || tagSelected ? true : false;

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
      } else {
        return;
      }
    }
  };

  return (
    <div className="flex flex-col gap-[4px] mt-[10px]">
      <div className="flex">
        <span className="text-neutrals-300 mt-[5px]">
          <Image src={globe} alt="tag icon" className="w-[18px] h-[18px]" />
        </span>
        <div className="w-full flex flex-col gap-[4px]">
          <AccordionItem
            page={page}
            title="Language"
            pageState={pageState}
            openAccordion={openAccordion}
            index={1}
            handleAccordion={handleAccordion}
          />
        </div>
      </div>
      <div className="flex border border-x-0 border-t border-b-0">
        <span className="text-neutrals-300 mt-[5px]">
          <Image src={group} alt="tag icon" className=" w-[18px] h-[18px]" />
        </span>
        <div className="w-full flex flex-col gap-[4px]">
          <AccordionItem
            page={page}
            title="Audience"
            pageState={pageState}
            openAccordion={openAccordion}
            index={2}
            handleAccordion={handleAccordion}
          />
        </div>
      </div>

      <div
        className={`flex border border-x-0 border-t py-1 border-neutrals-200 ${
          isFilter ? "border-b" : "border-b-0"
        }`}
      >
        <span className="text-neutrals-300 mt-[5px]">
          <Image src={tag} alt="tag icon" className=" w-[18px] h-[18px]" />
        </span>
        <div className="w-full">
          <AccordionItem
            page={page}
            title="Tags"
            pageState={pageState}
            openAccordion={openAccordion}
            index={3}
            handleAccordion={handleAccordion}
          />
        </div>
      </div>
      {isFilter && (
        <div>
          <ClearBtn clickHandler={clearFilterHandler} />
        </div>
      )}
    </div>
  );
};

export default AudienceAccordion;
