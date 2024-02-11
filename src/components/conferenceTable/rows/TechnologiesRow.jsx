import Image from "next/image";
import { iconsData } from "@/data/commonData";

const TechnologiesRow = ({ tech }) => {
  const findIcon = iconsData.find((obj) => obj.name === tech.name);
  return (
    <div>
      <Image
        src={findIcon.image}
        alt="javascript logo"
        className="tableRowJs w-[30px] h-[31px] sm:w-[40px] sm:h-[41px]"
      />
      <Image
        src={findIcon.imageHover}
        className="tableRowJsHover w-[30px] h-[31px] sm:w-[40px] sm:h-[41px]"
        alt="javascript logo"
      />
    </div>
  );
};

export default TechnologiesRow;
