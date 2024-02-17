"use client";
import React from "react";

const techColors = [
  {
    name: "iOS",
    lightBg: "bg-[#FDE6EB]",
    darkBg: "hover:bg-[#B72461]",
    textColor: "text-[#B72461]",
  },
  {
    name: "React",
    lightBg: "bg-[#ECFCCB]",
    darkBg: "hover:bg-[#4D7C0F]",
    textColor: "text-[#4D7C0F]",
  },
  {
    name: "Angular",
    lightBg: "bg-[#CCFBF1]",
    darkBg: "hover:bg-[#0F766E]",
    textColor: "text-[#0F766E]",
  },
  {
    name: "JavaScript",
    lightBg: "bg-[#ECF9FD]",
    darkBg: "hover:bg-[#0369A1]",
    textColor: "text-[#0369A1]",
  },
  {
    name: "Android",
    lightBg: "bg-[#F3E8FF]",
    darkBg: "hover:bg-[#7F23CE]",
    textColor: "text-[#7F23CE]",
  },
  {
    name: "Flutter",
    lightBg: "bg-[#FAE8FF]",
    darkBg: "hover:bg-[#A21CAF]",
    textColor: "text-[#A21CAF]",
  },
  {
    name: "Java",
    lightBg: "bg-[#FEF8C3]",
    darkBg: "hover:bg-[#A2640D]",
    textColor: "text-[#A2640D]",
  },
  {
    name: "PHP",
    lightBg: "bg-[#FFEDD5]",
    darkBg: "hover:bg-[#C2410C]",
    textColor: "text-[#C2410C]",
  },
];

const TechnologiesRow = ({ obj, clickHandler }) => {
  const findTech = techColors.find((tech) => tech.name === obj?.name);

  const { lightBg, darkBg, textColor } = findTech ?? {
    lightBg: "bg-[#FDE6EB]",
    darkBg: "hover:bg-[#B72461]",
    textColor: "text-[#B72461]",
  };

  return (
    <p
      className={`text-[12px] font-[600] text-center leading-[12px] py-[5px] px-[8px] rounded-[4px] ${lightBg} ${textColor} ${darkBg}
       hover:text-white`}
      onClick={() => clickHandler(obj?.name, "Tags")}
    >
      {obj?.name}
    </p>
  );
};

export default TechnologiesRow;
