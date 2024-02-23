import Image from "next/image";

const TechnologiesRow = ({ tech, clickHandler, techSelected }) => {
  const { filledIcon, unfilledIcon } = tech;

  return (
    <div
      className="cursor-pointer"
      onClick={() => clickHandler(tech?.name, "Technology", tech?.id)}
    >
      {techSelected === tech?.name ? (
        <Image
          src={filledIcon?.src}
          className="w-[23px] h-[23px] sm:w-[30px] sm:h-[31px] lg:w-[40px] lg:h-[41px]"
          alt="javascript logo"
          width={40}
          height={41}
        />
      ) : (
        <div>
          <Image
            src={unfilledIcon?.src}
            alt="javascript logo"
            className="tableRowJs w-[23px] h-[23px] sm:w-[30px] sm:h-[31px] lg:w-[40px] lg:h-[41px]"
            width={40}
            height={41}
          />
          <Image
            src={filledIcon?.src}
            className="tableRowJsHover w-[30px] h-[31px] sm:w-[40px] sm:h-[41px]"
            alt="javascript logo"
            width={40}
            height={41}
          />
        </div>
      )}
    </div>
  );
};

export default TechnologiesRow;
