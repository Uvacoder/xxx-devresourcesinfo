"use client";
import Image from "next/image";
import { iconsData } from "@/data/commonData";

const TechnologiesRow = ({ tech, clickHandler, techSelected }) => {
  const findIcon = iconsData.find((obj) => obj.name === tech.name);

  return (
    <div onClick={() => clickHandler(tech?.name, "Technology", tech?.id)}>
      {techSelected === tech?.name ? (
        <Image
          src={findIcon.imageHover}
          className="w-[30px] h-[31px] sm:w-[40px] sm:h-[41px]"
          alt="javascript logo"
        />
      ) : (
        <div>
          <Image
            src={findIcon.image}
            alt="javascript logo"
            className="tableRowJs w-[23px] h-[23px] sm:w-[30px] sm:h-[31px] lg:w-[40px] lg:h-[41px]"
          />
          <Image
            src={findIcon.imageHover}
            className="tableRowJsHover w-[30px] h-[31px] sm:w-[40px] sm:h-[41px]"
            alt="javascript logo"
          />
        </div>
      )}
    </div>
  );
};

export default TechnologiesRow;
