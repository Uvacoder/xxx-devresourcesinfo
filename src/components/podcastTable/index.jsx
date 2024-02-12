import globe from "@/assets/globe.svg";
import group from "@/assets/group.svg";
import Image from "next/image";

const PodcastTable = ({ data }) => {
  return (
    <div className="border border-neutrals-100 rounded-[8px] overflow-hidden">
      <ul>
        {data?.map(({ node }, index) => (
          <li
            key={node?.id + index}
            className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-[#f7f6fe] text-neutrals-400 hover:text-neutrals-600 cursor-pointer py-[16px] px-[24px]"
          >
            <div className="w-full flex flex-col items-start">
              <p className="tableRowTitle text-xl sm:text-2xl text-neutrals-900 font-[700]">
                {node.name}
              </p>
              <div className="flex gap-[16px] mt-[6.5px] text-neutrals-600 text-[12px] sm:text-sm">
                <p className="flex items-center gap-[4px]">
                  <Image
                    src={globe}
                    alt="language icon"
                    className="text-neutrals-300 w-[16px] h-[16px]"
                  />
                  <span className="text-[14px] font-[400]">
                    {node?.language[0]?.name}
                  </span>
                </p>
                <p className="flex items-center gap-[4px]">
                  <Image
                    src={group}
                    alt="audience icon"
                    className="text-neutrals-300 w-[16px] h-[16px]"
                  />
                  <span className="text-[14px] font-[400]">
                    {node?.target[0]?.name}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastTable;
