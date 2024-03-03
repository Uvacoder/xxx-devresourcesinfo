import IndividualRow from "./row/IndividualRow";

const ConferenceTable = ({ data, stateObj }) => {
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
          <h2 className="uppercase text-[12px] tracking-[1.2px] font-[700] text-neutrals-300 py-[8px] px-[24px] bg-grays-op-200 border-b border-neutrals-100">
            {monthYear}
          </h2>
          <ul>
            {arrays?.map(({ node }, index) => (
              <li key={node?.id + index}>
                <IndividualRow
                  node={node}
                  stateObj={stateObj}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ConferenceTable;
