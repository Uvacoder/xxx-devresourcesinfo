"use client";
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import ModalContainer from "../modalContainer";
import { findDropDownCategory } from "@/data/dropDownData";
import { useSelector } from "react-redux";

const DropdownWrapper = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const conferences = useSelector(({ conferences }) => conferences);
  const podcasts = useSelector(({ podcasts }) => podcasts);
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
        <p className="text-[#3129E7] text-[14px] font-[700] ml-[4px]">
          {categorySelected.page === "conferences"
            ? conferences[categorySelected?.attrSelected]
            : podcasts[categorySelected?.attrSelected]}
        </p>
        <IoChevronDownSharp className="p-[1px]" />
      </button>
      {showModal && (
        <ModalContainer
          title={title}
          setShowModal={setShowModal}
          categoryData={categoryData}
          page={categorySelected.page}
        />
      )}
    </div>
  );
};

export default DropdownWrapper;