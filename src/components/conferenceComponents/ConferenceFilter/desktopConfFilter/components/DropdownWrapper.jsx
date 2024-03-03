"use client";
import ModalContainer from "@/components/modalContainer";
import { findDropDownCategory } from "@/data/dropDownData";
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

const DropdownWrapper = ({ title,stateObj }) => {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const handleClick = () => {
    setShowModal(() => !showModal);
  };

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

  return (
    <div className="relative">
      <button
        className="flex items-center gap-[4px] text-neutrals-400 p-[5px] pl-[12px] pr-[4px] cursor-pointer"
        onClick={() => handleClick()}
      >
        <p className="text-[13px] font-[500]">{title}</p>
        <p className="text-primary-end text-[14px] font-[700] ml-[4px]">
          {stateObj[categorySelected?.attrSelected]}
        </p>
        <IoChevronDownSharp className="p-[1px]" />
      </button>
      {showModal && (
        <ModalContainer
          title={title}
          setShowModal={setShowModal}
          categoryData={categoryData}
          page="conferences"
          stateObj={stateObj}
        />
      )}
    </div>
  );
};

export default DropdownWrapper;
