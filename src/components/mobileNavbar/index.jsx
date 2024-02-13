"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbMenu2 } from "react-icons/tb";

const MobileNavbar = ({ menu, pathname }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="block sm:hidden">
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
        <ul class="fixed w-full top-[40px] left-0 flex flex-col items-end gap-[10px] p-5 bg-neutral-base text-white">
          {menu.map((item) => {
            const isActive =
              pathname === item.url
                ? "border-b-4 gradient-border-bottom font-[700]"
                : "text-neutral-200 font-[400]";
            return (
              <li>
                <a
                  class={`inline-block text-[14px] sm:text-[15px] xl:text-[16px] no-underline hover:text-white ${isActive}`}
                  href={item.url}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MobileNavbar;
