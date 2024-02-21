import React, { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { findDropDownCategory } from "@/data/dropDownData";
import MobileModalContainer from "@/components/modalContainer/mobileModalContainer";

const AccordionItem = ({
  page,
  title,
  pageState,
  openAccordion,
  setOpenAccordion,
  index,
  handleAccordion,
}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const categorySelected = findDropDownCategory.find(
    ({ name }) => name === title
  );
  const getData = async () => {
    const response = await categorySelected?.func();
    setCategoryData(() => response);
  };

  useEffect(() => {
    getData();
  }, [title]);

  useEffect(() => {
    if (index !== openAccordion) {
      setIsActive(false);
    }
  }, [openAccordion]);

  const clickHandler = () => {
    handleAccordion(index, isActive);
    setIsActive((prev) => !prev);
  };

  return (
    <div>
      <button
        className={`w-full flex items-center gap-[4px] text-neutrals-400 p-[5px] pl-[12px] pr-[4px] cursor-pointer ${
          isActive && "text-neutrals-600"
        }`}
        onClick={clickHandler}
      >
        <p className={`text-[13px] font-[500] ${isActive && "font-[700]"}`}>
          {title}
        </p>
        <p className="text-primary-end text-[14px] font-[700] ml-[4px]">
          {pageState[categorySelected?.attrSelected]}
        </p>
        <IoChevronDownSharp className="p-[1px]" />
      </button>
      {openAccordion === index && (
        <MobileModalContainer
          title={title}
          categoryData={categoryData}
          page={page}
          pageState={pageState}
          handleDropDown={clickHandler}
        />
      )}
    </div>
  );
};

export default AccordionItem;
