import React from "react";
import { techColors } from "@/data/commonData";

const TechnologiesRow = ({ name }) => {
  const findTech = techColors.find((obj) => obj.name === name);
  const { lightBg, darkBg, textColor } = findTech ?? {
    lightBg: "bg-[#FDE6EB]",
    darkBg: "hover:bg-[#B72461]",
    textColor: "text-[#B72461]",
  };

  return (
    <p
      className={`text-[12px] font-[600] text-center leading-[12px] py-[5px] px-[8px] rounded-[4px] ${lightBg} ${textColor} ${darkBg}
       hover:text-white`}
    >
      {name}
    </p>
  );
};

export default TechnologiesRow;
