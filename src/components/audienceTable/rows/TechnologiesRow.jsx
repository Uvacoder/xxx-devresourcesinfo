import React, { useState } from "react";

const TechnologiesRow = ({ obj, clickHandler, tagSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const darkColor = obj?.darkColor ?? "#B72461";
  const lightColor = obj?.lightColor ?? "#FDE6EB";

  const normalStyle = {
    backgroundColor: lightColor,
    color: darkColor,
  };

  const hoverStyle = {
    backgroundColor: darkColor,
    color: "white",
  };
  return (
    <>
      {tagSelected === obj?.name ? (
        <p
          className={`text-[11px] xs-450:text-[12px] font-[600] text-center leading-[12px] py-[3px] px-[6px] xs-450:py-[5px] xs-450:px-[8px] rounded-[4px] text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
          style={{ backgroundColor: darkColor }}
        >
          {obj?.name}
        </p>
      ) : (
        <div
          className={`text-[11px] xs-450:text-[12px] font-[600] text-center leading-[12px] py-[3px] px-[6px] xs-450:py-[5px] xs-450:px-[8px] rounded-[4px] hover:bg-[${darkColor}] hover:text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
          style={isHovered ? { ...normalStyle, ...hoverStyle } : normalStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {obj?.name}
        </div>
      )}
    </>
  );
};

export default TechnologiesRow;
