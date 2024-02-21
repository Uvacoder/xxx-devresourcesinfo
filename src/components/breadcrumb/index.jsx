"use client";
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import React from "react";
import { removePercent20 } from "@/utils/utils";
import { useDispatch } from "react-redux";

const Breadcrumb = ({
  page,
  breadcrumbHandler,
  setterFunc,
  clearFunc,
  URL,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const parts = pathname?.split("/");

  const clickHandler = (textSelected) => {
    if (textSelected === page) {
      dispatch(clearFunc());
    } else {
      breadcrumbHandler(dispatch, setterFunc, parts, textSelected, URL);
    }
  };

  return (
    <>
      {parts.length > 2 && (
        <ul className="flex gap-[3px] items-center pb-[16px]">
          {parts.map((path, index) => (
            <li
              className="flex gap-[3px] items-center text-neutrals-400 font-[500]"
              key={index}
            >
              {index > 1 && (
                <IoChevronForward className="text-neutrals-200 w-[17px] h-[17px]" />
              )}
              <span
                className="capitalize text-[13px] cursor-pointer hover:text-primary-end"
                onClick={() => clickHandler(removePercent20(path))}
              >
                {removePercent20(path)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Breadcrumb;
