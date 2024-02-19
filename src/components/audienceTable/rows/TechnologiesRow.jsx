"use client";
import React from "react";

const techColors = [
  {
    name: "iOS",
    lightBg: "bg-[#FDE6EB]",
    darkBgHover: "hover:bg-[#B72461]",
    textColor: "text-[#B72461]",
    darkBg: "bg-[#B72461]",
  },
  {
    name: "React",
    lightBg: "bg-[#ECFCCB]",
    darkBgHover: "hover:bg-[#4D7C0F]",
    textColor: "text-[#4D7C0F]",
    darkBg: "bg-[#4D7C0F]",
  },
  {
    name: "Angular",
    lightBg: "bg-[#CCFBF1]",
    darkBgHover: "hover:bg-[#0F766E]",
    textColor: "text-[#0F766E]",
    darkBg: "bg-[#0F766E]",
  },
  {
    name: "JavaScript",
    lightBg: "bg-[#ECF9FD]",
    darkBgHover: "hover:bg-[#0369A1]",
    textColor: "text-[#0369A1]",
    darkBg: "bg-[#0369A1]",
  },
  {
    name: "Android",
    lightBg: "bg-[#F3E8FF]",
    darkBgHover: "hover:bg-[#7F23CE]",
    textColor: "text-[#7F23CE]",
    darkBg: "bg-[#7F23CE]",
  },
  {
    name: "Flutter",
    lightBg: "bg-[#FAE8FF]",
    darkBgHover: "hover:bg-[#A21CAF]",
    textColor: "text-[#A21CAF]",
    darkBg: "bg-[#A21CAF]",
  },
  {
    name: "Java",
    lightBg: "bg-[#FEF8C3]",
    darkBgHover: "hover:bg-[#A2640D]",
    textColor: "text-[#A2640D]",
    darkBg: "bg-[#A2640D]",
  },
  {
    name: "PHP",
    lightBg: "bg-[#FFEDD5]",
    darkBgHover: "hover:bg-[#C2410C]",
    textColor: "text-[#C2410C]",
    darkBg: "bg-[#C2410C]",
  },
];

const TechnologiesRow = ({ obj, clickHandler, tagSelected }) => {
  const findTech = techColors.find((tech) => tech.name === obj?.name);

  const { lightBg, darkBgHover, textColor, darkBg } = findTech ?? {
    lightBg: "bg-[#FDE6EB]",
    darkBgHover: "hover:bg-[#B72461]",
    textColor: "text-[#B72461]",
    darkBg: "bg-[#B72461]",
  };

  return (
    <>
      {tagSelected === obj?.name ? (
        <p
          className={`text-[12px] font-[600] text-center leading-[12px] py-[5px] px-[8px] rounded-[4px] ${darkBg} text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
        >
          {obj?.name}
        </p>
      ) : (
        <p
          className={`text-[12px] font-[600] text-center leading-[12px] py-[5px] px-[8px] rounded-[4px] ${lightBg} ${textColor} ${darkBgHover}
       hover:text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
        >
          {obj?.name}
        </p>
      )}
    </>
  );
};

export default TechnologiesRow;
