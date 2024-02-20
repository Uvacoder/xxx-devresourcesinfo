"use client";
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import React from "react";
import { removePercent20 } from "@/utils/utils";

const Breadcrumb = () => {
  const pathname = usePathname();
  const parts = pathname?.split("/");
  
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
              <span className="capitalize text-[13px] cursor-pointer">
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
