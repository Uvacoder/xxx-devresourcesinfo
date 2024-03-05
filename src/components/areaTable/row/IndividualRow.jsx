import React from "react";
import TechnologiesRow from "../rowElements/TechnologiesRow";
import DateRow from "../rowElements/DateRow";
import City from "../rowElements/City";
import Country from "../rowElements/Country";
import Continent from "../rowElements/Continent";
import Link from "next/link";

const IndividualRow = ({ node, clickHandler, techSelected }) => {
  return (
    <>
      <div className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-whites-800 text-neutrals-400 hover:text-neutrals-600">
        <DateRow node={node} />
        <div className="w-full flex flex-col items-start py-[16px] pl-0 xs-450:pl-3 sm:pl-[40px] lg:pl-[64px]">
          <Link
            className="inline-block tableRowTitle text-lg xs-450:text-xl sm:text-2xl text-neutrals-900 font-[700]"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.name}
          </Link>
          <p className="flex gap-1 flex-wrap text-neutrals-500 text-[11px] xs-450:text-[12px] sm:text-sm">
            <City
              node={node}
              clickHandler={clickHandler}
              country={node?.country[0]?.name}
            />
            {node?.city?.name !== "Online" && (
              <>
                {node?.country[0]?.name && (
                  <Country
                    node={node}
                    clickHandler={clickHandler}
                    continent={node?.continent[0]?.name}
                  />
                )}
                {node?.continent[0]?.name && (
                  <Continent node={node} clickHandler={clickHandler} />
                )}
              </>
            )}
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
      </div>
    </>
  );
};

export default IndividualRow;
