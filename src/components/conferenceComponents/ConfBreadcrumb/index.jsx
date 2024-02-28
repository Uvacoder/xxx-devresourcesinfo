"use client";
import { useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { removePercent20 } from "@/utils/utils";
import { useCallback } from "react";
import { CONFERENCES_URL } from "@/utils/constants";

const ConfBreadcrumb = ({ stateObj }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameSegments = pathname?.split("/");

  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
  } = stateObj;

  const createQueryString = useCallback((queryParams) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(queryParams)) {
      if (value !== "") {
        params.set(name, value);
      }
    }
    return params.toString();
  }, []);

  const clickHandler = (textSelected) => {
    if (textSelected === "conferences") {
      router.push(`${CONFERENCES_URL}`);
    } else if (textSelected === citySelected) {
      const queryParams = {
        continent: continentSelected,
        country: countrySelected,
        city: citySelected,
        tech: "",
        mode: pastConf,
      };
      const url = `${CONFERENCES_URL}/${continentSelected}/${countrySelected}/${citySelected}`;

      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else if (textSelected === countrySelected) {
      const queryParams = {
        continent: continentSelected,
        country: countrySelected,
        city: "",
        tech: "",
        mode: pastConf,
      };

      const url = `${CONFERENCES_URL}/${continentSelected}/${countrySelected}`;
      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else if (textSelected === continentSelected) {
      const queryParams = {
        continent: continentSelected,
        country: "",
        city: "",
        tech: "",
        mode: pastConf,
      };

      const url = `${CONFERENCES_URL}/${continentSelected}`;
      router.push(`${url}/?${createQueryString(queryParams)}`);
    } else {
      return;
    }
  };

  return (
    <>
      {pathnameSegments.length > 2 && (
        <ul className="flex gap-[2px] md:gap-[3px] items-center pb-[16px]">
          {pathnameSegments.map((path, index) => (
            <li
              className="flex gap-[2px] md:gap-[3px] items-center text-neutrals-400 font-[500]"
              key={index}
            >
              {index > 1 && (
                <IoChevronForward className="text-neutrals-200 w-[11px] h-[11px] md:w-[17px] md:h-[17px]" />
              )}
              <span
                className="capitalize text-[10px] md:text-[13px] cursor-pointer hover:text-primary-end"
                onClick={() => clickHandler(removePercent20(path))}
              >
                {removePercent20(path)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ConfBreadcrumb;
