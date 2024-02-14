"use client";
import { useDispatch, useSelector } from "react-redux";
import DateRow from "./rows/DateRow";
import TechnologiesRow from "./rows/TechnologiesRow";
import { findCategoryData } from "@/data/modalContainerData";
import { addQuotesToString } from "@/utils/utils";
import {
  setOtherByCity,
  setOtherByCountry,
} from "@/redux/features/conference/conferenceSlice";
import { getAreaByCity, getAreaByCountry } from "@/services/api/conferenceAPI";
import { fetchConferencesByAllFilter } from "@/redux/features/conference/action";

const ConferenceTable = ({ data }) => {
  const {
    citySelected,
    countrySelected,
    continentSelected,
    techSelected,
    pastConf,
    todayDate,
  } = useSelector(({ conferences }) => conferences);
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
        fetchConferencesByAllFilter({
          citySelected: textSelected,
          countrySelected: convertCountry,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "Country") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: convertCity,
          countrySelected: textSelected,
          continentSelected: convertContinent,
          techSelected: convertTech,
          convertedDate,
        })
      );
    } else if (menuTitle === "Continent") {
      dispatch(
        fetchConferencesByAllFilter({
          citySelected: convertCity,
          countrySelected: convertCountry,
          continentSelected: textSelected,
          techSelected: convertTech,
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
      dispatch(
        setOtherByCity({
          country: data?.country?.name,
          continent: data?.country?.continent?.name,
        })
      );
      getData(
        menuTitle,
        convertStr,
        data?.country?.continent?.name,
        data?.country?.name
      );
    } else {
      const { data } = await getAreaByCountry(convertId);
      dispatch(setOtherByCountry(data?.continent?.name));
      getData(menuTitle, convertStr, data?.continent?.name);
    }
  };

  const clickHandler = (name, menuTitle, id) => {
    const convertStr = addQuotesToString(name);

    const categorySelected = findCategoryData.find(
      ({ name }) => name === menuTitle
    );

    dispatch(categorySelected.toChangeAtt({ value: name, id: id }));

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
          <h2 className="uppercase text-[12px] tracking-[1.2px] font-[700] text-neutrals-300 py-[8px] px-[24px] bg-[#f6f6f980] border-b border-neutrals-100">
            {monthYear}
          </h2>
          <ul>
            {arrays?.map(({ node }, index) => (
              <li
                key={node?.id + index}
                className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-[#f7f6fe] text-neutrals-400 hover:text-neutrals-600 cursor-pointer"
              >
                <DateRow node={node} />
                <div className="w-full flex flex-col items-start py-[16px] pl-3 sm:pl-[40px] lg:pl-[64px]">
                  <a
                    className="inline-block tableRowTitle text-xl sm:text-2xl text-neutrals-900 font-[700]"
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.name}
                  </a>
                  <p className="flex flex-wrap gap-[2px] text-neutrals-500 text-[12px] sm:text-sm">
                    <span
                      className="hover:font-[700] hover:underline hover:text-[#3129E7]"
                      onClick={() =>
                        clickHandler(node?.city?.name, "City", node?.city?.id)
                      }
                    >
                      {node?.city?.name}
                    </span>
                    ,
                    <span
                      className="hover:font-[700] hover:underline hover:text-[#3129E7]"
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
                      className="hover:font-[700] hover:underline hover:text-[#3129E7]"
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

                <div className="min-w-[100px] sm:min-w-[200px] pl-3 sm:pl-[40px] lg:min-w-[360px] flex flex-wrap py-[16px] gap-[5px] sm:gap-[10px] items-center md:self-stretch text-neutrals-500 text-lg">
                  {node.technologies.map((tech, index) => (
                    <div key={tech + index}>
                      <TechnologiesRow
                        tech={tech}
                        clickHandler={clickHandler}
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

export default ConferenceTable;
