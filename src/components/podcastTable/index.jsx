import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";
import Image from "next/image";
import TechnologiesRow from "./rows/TechnologiesRow";

const PodcastTable = ({ data }) => {
  return (
    <div className="border border-neutrals-100 rounded-[8px] overflow-hidden">
      <ul>
        {data?.map(({ node }, index) => (
          <li
            key={node?.id + index}
            className="confTable flex justify-between items-center gap-2 border-b border-neutrals-100 bg-white hover:bg-[#f7f6fe] text-neutrals-400 hover:text-neutrals-600 cursor-pointer py-[16px] px-[16px] md:px-[24px]"
          >
            <div className="w-full flex flex-col items-start">
              <a
                className="inline-block tableRowTitle text-xl sm:text-2xl text-neutrals-900 font-[700]"
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.name}
              </a>
              <div className="flex gap-[10px] sm:gap-[16px] flex-wrap mt-[6.5px] text-neutrals-600 text-[12px] sm:text-sm">
                <p className="flex items-center gap-[4px]">
                  <Image
                    src={globe}
                    alt="language icon"
                    className="text-neutrals-300 w-[16px] h-[16px]"
                  />
                  <span className="text-[14px] font-[400] hover:font-[700] hover:underline">
                    {node?.language[0]?.name}
                  </span>
                </p>
                <p className="flex items-center gap-[4px]">
                  <Image
                    src={group}
                    alt="audience icon"
                    className="text-neutrals-300 w-[16px] h-[16px]"
                  />
                  <span className="text-[14px] font-[400] hover:font-[700] hover:underline">
                    {node?.target[0]?.name}
                  </span>
                </p>
              </div>
            </div>

            <ul className="flex items-center justify-end md:justify-normal flex-wrap gap-[10px] min-w-[120px] sm:min-w-[200px] md:min-w-[320px] sm:self-stretch">
              {node?.technology?.map(({ id, name }) => (
                <li key={id}>
                  <TechnologiesRow name={name} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastTable;
