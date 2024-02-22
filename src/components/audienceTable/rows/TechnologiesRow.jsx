import React from "react";

const TechnologiesRow = ({ obj, clickHandler, tagSelected }) => {
  return (
    <>
      {tagSelected === obj?.name ? (
        <p
          className={`text-[11px] xs-450:text-[12px] font-[600] text-center leading-[12px] py-[3px] px-[6px] xs-450:py-[5px] xs-450:px-[8px] rounded-[4px] bg-[${
            obj?.darkColor ?? "#B72461"
          }] text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
        >
          {obj?.name}
        </p>
      ) : (
        <p
          className={`text-[11px] xs-450:text-[12px] font-[600] text-center leading-[12px] py-[3px] px-[6px] xs-450:py-[5px] xs-450:px-[8px] rounded-[4px] bg-[${
            obj?.lightColor ?? "#FDE6EB"
          }] text-[${obj?.darkColor ?? "#B72461"}] hover:bg-[${
            obj?.darkColor ?? "#B72461"
          }] hover:text-white`}
          onClick={() => clickHandler(obj?.name, "Tags")}
        >
          {obj?.name}
        </p>
      )}
    </>
  );
};

export default TechnologiesRow;
