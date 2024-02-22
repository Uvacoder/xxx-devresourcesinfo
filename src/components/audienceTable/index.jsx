"use client";
import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";
import Image from "next/image";
import TechnologiesRow from "./rows/TechnologiesRow";
import { useDispatch } from "react-redux";
import { addQuotesToString } from "@/utils/utils";
import { findCategoryData } from "@/data/modalContainerData";

const AudienceTable = ({ data, page, pageState, filterFunc }) => {
  const { langSelected, audienceSelected, tagSelected } = pageState;
  const dispatch = useDispatch();

  const getData = (textSelected, title) => {
    const convertLang = langSelected
      ? addQuotesToString(langSelected)
      : undefined;
    const convertAudience = audienceSelected
      ? addQuotesToString(audienceSelected)
      : undefined;
    const convertTag = tagSelected ? addQuotesToString(tagSelected) : undefined;

    if (title === "Language") {
      dispatch(
        filterFunc({
          langSelected: textSelected,
          audienceSelected: convertAudience,
          tagSelected: convertTag,
        })
      );
    } else if (title === "Audience") {
      dispatch(
        filterFunc({
          langSelected: convertLang,
          audienceSelected: textSelected,
          tagSelected: convertTag,
        })
      );
    } else {
      dispatch(
        filterFunc({
          langSelected: convertLang,
          audienceSelected: convertAudience,
          tagSelected: textSelected,
        })
      );
    }
  };

  const clickHandler = (name, title) => {
    const categorySelected = findCategoryData.find(
      ({ name }) => name === title
    );
    const convertStr = addQuotesToString(name);
    getData(convertStr, title);
    if (page === "podcasts") {
      dispatch(categorySelected.toChangeAtt(name));
    } else if (page === "blogs") {
      dispatch(categorySelected.toChangeBlogAtt(name));
    } else if (page === "newsletters") {
      dispatch(categorySelected.toChangeNewsAtt(name));
    } else if (page === "youtube") {
      dispatch(categorySelected.toChangeYoutubeAtt(name));
    } else {
      return;
    }
  };
  return (
    <div className="border border-neutrals-100 rounded-[8px] overflow-hidden">
      <ul>
        {data?.map(({ node }, index) => (
          <li
            key={node?.id + index}
            className="confTable flex justify-between items-center gap-2 border-b border-neutrals-100 bg-white hover:bg-whites-800 text-neutrals-400 hover:text-neutrals-600 py-[16px] px-2 xs-450:px-[16px] md:px-[24px]"
          >
            <div className="w-full flex flex-col items-start">
              <a
                className="inline-block tableRowTitle text-lg xs-450:text-xl sm:text-2xl text-neutrals-900 font-[700]"
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.name}
              </a>
              <div className="flex gap-[10px] sm:gap-[16px] flex-wrap mt-[6.5px] text-neutrals-600">
                <p
                  className="flex items-center gap-[4px] cursor-pointer"
                  onClick={() =>
                    clickHandler(node?.language[0]?.name, "Language")
                  }
                >
                  <Image
                    src={globe}
                    alt="language icon"
                    className="text-neutrals-300 w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]"
                  />
                  <span className="text-[11px] xs-450:text-[12px] sm:text-[14px] font-[400] hover:font-[700] hover:underline">
                    {node?.language[0]?.name}
                  </span>
                </p>
                <p
                  className="flex items-center gap-[4px] cursor-pointer"
                  onClick={() =>
                    clickHandler(node?.target[0]?.name, "Audience")
                  }
                >
                  <Image
                    src={group}
                    alt="audience icon"
                    className="text-neutrals-300 w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]"
                  />
                  <span className="text-[11px] xs-450:text-[12px] sm:text-[14px] font-[400] hover:font-[700] hover:underline">
                    {node?.target[0]?.name}
                  </span>
                </p>
              </div>
            </div>

            <ul className="flex items-center justify-end md:justify-normal flex-wrap gap-[10px] min-w-[120px] sm:min-w-[200px] md:min-w-[320px] sm:self-stretch">
              {node?.technology?.map((obj) => (
                <li key={obj?.id} className="cursor-pointer">
                  <TechnologiesRow
                    obj={obj}
                    clickHandler={clickHandler}
                    tagSelected={tagSelected}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudienceTable;
