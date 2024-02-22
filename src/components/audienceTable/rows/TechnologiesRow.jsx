import React from "react";

const TechnologiesRow = ({ obj, clickHandler, tagSelected }) => {
  const darkColor = obj?.darkColor ?? "#B72461";
  const lightColor = obj?.lightColor ?? "#FDE6EB";

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
        <p
          className={` text-[11px] xs-450:text-[12px] font-[600] text-center leading-[12px] py-[3px] px-[6px] xs-450:py-[5px] xs-450:px-[8px] rounded-[4px] hover:bg-[${darkColor}] hover:text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
          style={{
            backgroundColor: lightColor,
            color: darkColor,
          }}
        >
          {obj?.name}
        </p>
      )}
    </>
  );
};

export default TechnologiesRow;
