"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { updateConferenceURL } from "@/utils/conferenceFunc";

const Technologies = ({ tech, stateObj }) => {
  const { filledIcon, unfilledIcon } = tech;
  const router = useRouter();

  const createQueryString = useCallback((queryParams) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(queryParams)) {
      if (value !== "") {
        params.set(name, value);
      }
    }
    return params.toString();
  }, []);

  const clickHandler = async (selectedTechName) => {
    const updatedState = {
      ...stateObj,
      techSelected: selectedTechName,
    };
    const url = updateConferenceURL(updatedState);

    const queryParams = {
      continent: stateObj?.continentSelected,
      country: stateObj?.countrySelected,
      city: stateObj?.citySelected,
      tech: selectedTechName,
      mode: stateObj?.pastConf,
      hasStartCursor: stateObj?.hasStartCursor,
      hasEndCursor: stateObj?.hasEndCursor,
      page: stateObj?.page,
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  return (
    <div className="cursor-pointer" onClick={() => clickHandler(tech?.name)}>
      {stateObj?.techSelected === tech?.name ? (
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
            className="tableRowJsHover w-[23px] h-[23px] sm:w-[30px] sm:h-[31px] lg:w-[40px] lg:h-[41px]"
            alt="javascript logo"
            width={40}
            height={41}
          />
        </div>
      )}
    </div>
  );
};

export default Technologies;
