"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbMenu2 } from "react-icons/tb";
import PrimaryBtn from "../primaryBtn";

const MobileNavbar = ({ menu, pathname }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="block lg:hidden">
      <div
        className="m-[10px] mx-[8px]"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {showMenu ? (
          <RxCross2 className="text-red w-[24px] h-[24px]" />
        ) : (
          <TbMenu2 className="text-red w-[24px] h-[24px]" />
        )}
      </div>

      {showMenu && (
        <div className="fixed w-full top-[43px] left-0 bg-neutral-base text-white">
          <ul className="flex flex-col items-start gap-[10px] pt-4 px-7 sm:p-5 sm:pb-0">
            {menu.map((item) => {
              const isActive =
                pathname === item.url
                  ? "border-b-4 gradient-border-bottom font-[700]"
                  : "text-neutral-200 font-[400]";
              return (
                <li key={item.text}>
                  <a
                    className={`inline-block text-[18px] no-underline hover:text-white ${isActive}`}
                    href={item.url}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="px-5 pt-3 pb-4">
            <PrimaryBtn text="Submit New" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
