import Link from "next/link";
import ConfScript from "../rowElements/ConfScript";
import DateRow from "@/components/areaTable/rowElements/DateRow";
import Technologies from "../rowElements/Technologies";
import City from "../rowElements/City";
import Country from "../rowElements/Country";
import Continent from "../rowElements/Continent";

const IndividualRow = ({ node, stateObj }) => {
  return (
    <div className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-whites-800 text-neutrals-400 hover:text-neutrals-600">
      <ConfScript node={node} />
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
            stateObj={stateObj}
            country={node?.country[0]?.name}
          />
          {node?.city?.name !== "Online" && (
            <>
              {node?.country[0]?.name && (
                <Country
                  node={node}
                  stateObj={stateObj}
                  continent={node?.continent[0]?.name}
                />
              )}
              {node?.continent[0]?.name && (
                <Continent node={node} stateObj={stateObj} />
              )}
            </>
          )}
        </p>
      </div>

      <div className="min-w-[75px] sm:min-w-[200px] pl-3 sm:pl-[40px] lg:min-w-[360px] flex flex-wrap py-[16px] gap-[5px] sm:gap-[10px] items-center md:self-stretch text-neutrals-500 text-lg">
        {node?.technologies?.map((tech, index) => (
          <div key={tech + index}>
            <Technologies tech={tech} stateObj={stateObj} />
          </div>
        ))}
        {node?.technology?.map((tech, index) => (
          <div key={tech + index}>
            <Technologies tech={tech} stateObj={stateObj} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualRow;
