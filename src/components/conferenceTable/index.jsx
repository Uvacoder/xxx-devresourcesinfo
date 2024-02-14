import DateRow from "./rows/DateRow";
import TechnologiesRow from "./rows/TechnologiesRow";

const ConferenceTable = ({ data }) => {
  const groupedObjects = data?.reduce((acc, obj) => {
    const startDate = new Date(obj.node.startDate);
    const monthYear = startDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[monthYear] = [...(acc[monthYear] || []), obj];
    return acc;
  }, {});

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
                  <p className="tableRowTitle text-xl sm:text-2xl text-neutrals-900 font-[700]">
                    {node.name}
                  </p>
                  <p className="flex flex-wrap gap-[2px] text-neutrals-500 text-[12px] sm:text-sm">
                    <span className="hover:font-[700] hover:underline hover:text-[#3129E7]">
                      {node?.city?.name}
                    </span>
                    ,
                    <span className="hover:font-[700] hover:underline hover:text-[#3129E7]">
                      {node?.country[0]?.name}
                    </span>
                    ,
                    <span className="hover:font-[700] hover:underline hover:text-[#3129E7]">
                      {node?.continent[0]?.name}
                    </span>
                  </p>
                </div>

                <div className="min-w-[100px] sm:min-w-[200px] pl-3 sm:pl-[40px] lg:min-w-[360px] flex flex-wrap py-[16px] gap-[5px] sm:gap-[10px] items-center md:self-stretch text-neutrals-500 text-lg">
                  {node.technologies.map((tech, index) => (
                    <div key={tech + index}>
                      <TechnologiesRow tech={tech} />
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
