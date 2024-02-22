import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AccordionItem from "./accordionItem";
import ClearBtn from "../clearBtn";

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
      <div>
        <div className="w-full">
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
        <div className="w-full">
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
