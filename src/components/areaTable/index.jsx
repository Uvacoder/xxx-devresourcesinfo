"use client";
import { useDispatch } from "react-redux";
import DateRow from "./rows/DateRow";
import TechnologiesRow from "./rows/TechnologiesRow";
import { findCategoryData } from "@/data/modalContainerData";
import { addQuotesToString } from "@/utils/utils";
import {
  setOtherByCity,
  setOtherByCountry,
} from "@/redux/features/conference/conferenceSlice";
import { getAreaByCity, getAreaByCountry } from "@/services/api/conferenceAPI";
import {
  setHackathonOtherByCity,
  setHackathonOtherByCountry,
} from "@/redux/features/hackathon/hackathonSlice";

const AreaTable = ({ data, page, pageState, filterFunc }) => {
  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
    todayDate,
  } = pageState;
  const dispatch = useDispatch();
  const groupedObjects = data?.reduce((acc, obj) => {
    const startDate = new Date(obj.node.startDate);
    const monthYear = startDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[monthYear] = [...(acc[monthYear] || []), obj];
    return acc;
  }, {});

  const getData = (menuTitle, textSelected, continent, country) => {
    const convertCity =
      continent || country
        ? undefined
        : citySelected
        ? addQuotesToString(citySelected)
        : undefined;
    const convertCountry = country
      ? addQuotesToString(country)
      : countrySelected
      ? addQuotesToString(countrySelected)
      : undefined;
    const convertContinent = continent
      ? addQuotesToString(continent)
      : continentSelected
      ? addQuotesToString(continentSelected)
      : undefined;
    const convertTech = techSelected
      ? addQuotesToString(techSelected)
      : undefined;
    const convertedDate = pastConf ? undefined : todayDate;

    if (menuTitle === "City") {
      dispatch(
        filterFunc({
          citySelected: textSelected,
          countrySelected: convertCountry,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "Country") {
      dispatch(
        filterFunc({
          citySelected: convertCity,
          countrySelected: textSelected,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "Continent") {
      dispatch(
        filterFunc({
          citySelected: convertCity,
          countrySelected: convertCountry,
          continentSelected: textSelected,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "Technology") {
      dispatch(
        filterFunc({
          citySelected: convertCity,
          countrySelected: convertCountry,
          continentSelected: convertContinent,
          techSelected: textSelected,
          convertedDate,
        })
      );
    } else {
      return;
    }
  };

  const setAreaValue = async (id, convertStr, categorySelected, menuTitle) => {
    const convertId = addQuotesToString(id);

    if (categorySelected?.name === "City") {
      const { data } = await getAreaByCity(convertId);
      if (page === "conferences") {
        dispatch(
          setOtherByCity({
            country: data?.country?.name,
            continent: data?.country?.continent?.name,
          })
        );
      } else if (page === "hackathons") {
        dispatch(
          setHackathonOtherByCity({
            country: data?.country?.name,
            continent: data?.country?.continent?.name,
          })
        );
      } else {
        return;
      }
      getData(
        menuTitle,
        convertStr,
        data?.country?.continent?.name,
        data?.country?.name
      );
    } else {
      const { data } = await getAreaByCountry(convertId);
      if (page === "conferences") {
        dispatch(setOtherByCountry(data?.continent?.name));
      } else if (page === "hackathons") {
        dispatch(setHackathonOtherByCountry(data?.continent?.name));
      } else {
        return;
      }
      getData(menuTitle, convertStr, data?.continent?.name);
    }
  };

  const clickHandler = (name, menuTitle, id) => {
    const convertStr = addQuotesToString(name);

    const categorySelected = findCategoryData.find(
      ({ name }) => name === menuTitle
    );

    if (page === "conferences") {
      dispatch(categorySelected.toChangeAtt({ value: name, id: id }));
    } else if (page === "hackathons") {
      dispatch(categorySelected.toChangeHackathonAtt({ value: name, id: id }));
    } else {
      return;
    }

    if (
      categorySelected?.name === "City" ||
      categorySelected?.name === "Country"
    ) {
      setAreaValue(id, convertStr, categorySelected, menuTitle);
    } else {
      getData(menuTitle, convertStr);
    }
  };

  return (
    <div className="border border-neutrals-100 rounded-[8px] overflow-hidden">
      {Object.entries(groupedObjects).map(([monthYear, arrays], index) => (
        <div key={monthYear + index}>
          <h2 className="uppercase text-[12px] tracking-[1.2px] font-[700] text-neutrals-300 py-[8px] px-[24px] bg-grays-op-200 border-b border-neutrals-100">
            {monthYear}
          </h2>
          <ul>
            {arrays?.map(({ node }, index) => (
              <li
                key={node?.id + index}
                className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-whites-800 text-neutrals-400 hover:text-neutrals-600"
              >
                <DateRow node={node} />
                <div className="w-full flex flex-col items-start py-[16px] pl-0 xs-450:pl-3 sm:pl-[40px] lg:pl-[64px]">
                  <a
                    className="inline-block tableRowTitle text-lg xs-450:text-xl sm:text-2xl text-neutrals-900 font-[700]"
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.name}
                  </a>
                  <p className="flex flex-wrap gap-[2px] text-neutrals-500 text-[11px] xs-450:text-[12px] sm:text-sm">
                    <span
                      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
                      onClick={() =>
                        clickHandler(node?.city?.name, "City", node?.city?.id)
                      }
                    >
                      {node?.city?.name}
                    </span>
                    ,
                    <span
                      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
                      onClick={() =>
                        clickHandler(
                          node?.country[0]?.name,
                          "Country",
                          node?.country[0]?.id
                        )
                      }
                    >
                      {node?.country[0]?.name}
                    </span>
                    ,
                    <span
                      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
                      onClick={() =>
                        clickHandler(
                          node?.continent[0]?.name,
                          "Continent",
                          node?.continent[0]?.id
                        )
                      }
                    >
                      {node?.continent[0]?.name}
                    </span>
                  </p>
                </div>

                <div className="min-w-[75px] sm:min-w-[200px] pl-3 sm:pl-[40px] lg:min-w-[360px] flex flex-wrap py-[16px] gap-[5px] sm:gap-[10px] items-center md:self-stretch text-neutrals-500 text-lg">
                  {node?.technologies?.map((tech, index) => (
                    <div key={tech + index}>
                      <TechnologiesRow
                        tech={tech}
                        clickHandler={clickHandler}
                        techSelected={techSelected}
                      />
                    </div>
                  ))}
                  {node?.technology?.map((tech, index) => (
                    <div key={tech + index}>
                      <TechnologiesRow
                        tech={tech}
                        clickHandler={clickHandler}
                        techSelected={techSelected}
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AreaTable;
