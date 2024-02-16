"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import Modal from "../modal";
import { findCategoryData } from "@/data/modalContainerData";
import ConferencesDropDown from "./pagesDropDown/ConferencesDropDown";
import PodcastDropDown from "./pagesDropDown/PodcastDropDown";

const ModalContainer = ({ title, setShowModal, categoryData, page }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categorySelected = findCategoryData.find(({ name }) => name === title);

  let menuTitle = title.toLowerCase();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDropDown = () => {
    setShowDropDown(() => !showDropDown);
  };

  const handleSearch = (e) => {
    setShowDropDown(true);
    setSearchTerm(e.target.value);
  };

  const filteredDropDownData =
    searchTerm.length > 0
      ? categoryData?.data.filter((obj) =>
          obj?.node?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : categoryData?.data;

  return (
    <Modal onClose={closeModal}>
      <div className="absolute top-0 left-0 z-10 md:w-[300px] md:top-10 p-[24px] flex flex-col gap-[16px] self-stretch bg-white border border-indigos-op-300 modalShadow rounded-[4px]">
        <div className="w-full flex flex-col items-start gap-[8px] self-stretch">
          <p className="text-neutral-base text-[16px] font-[700] self-stretch">
            {title}
          </p>
          <div className="w-full">
            <div className="flex items-center gap-2 pr-[8px] border border-neutrals-200 rounded-[4px] self-stretch mb-[4px] overflow-hidden">
              <input
                type="text"
                className="text-[13px] w-full p-[8px] pl-[12px]"
                placeholder={`Search or select a ${title.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
              />
              <span onClick={handleDropDown} className="cursor-pointer">
                <IoChevronDownSharp className="text-neutrals-400" />
              </span>
            </div>
            <div className="self-stretch">
              {showDropDown && (
                <ul className="flex flex-col border border-neutrals-200 rounded-[4px] max-h-[248px] overflow-auto">
                  {filteredDropDownData?.map((obj) => (
                    <li key={obj.node.id}>
                      {page === "conferences" ? (
                        <ConferencesDropDown
                          obj={obj.node}
                          categorySelected={categorySelected}
                          menuTitle={menuTitle}
                          setShowModal={setShowModal}
                        />
                      ) : (
                        <PodcastDropDown
                          obj={obj.node}
                          categorySelected={categorySelected}
                          menuTitle={menuTitle}
                          setShowModal={setShowModal}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContainer;
