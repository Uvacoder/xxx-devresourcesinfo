import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TechnologiesRow from "../rowElements/TechnologiesRow";
import DateRow from "../rowElements/DateRow";
import { getIndividualConfScript } from "@/services/api/conferenceAPI";
import { addQuotesToString, parseDate } from "@/utils/utils";

const IndividualRow = ({ node, clickHandler, techSelected }) => {
  const [scriptData, setScriptData] = useState({});
  const fetchScriptData = async () => {
    const id = addQuotesToString(node?.id);
    const response = await getIndividualConfScript(id);

    const eventName = encodeURIComponent(node?.name);

    const area = `${node?.city?.name}, ${node?.country[0]?.name}, ${node?.continent[0]?.name}`;
    const eventArea = encodeURIComponent(area);

    const startDateFormated = parseDate(node?.startDate);
    const endDateFormated = node?.endDate && parseDate(node?.endDate);
    const formattedDate = `${startDateFormated.date} ${startDateFormated?.mon} ${startDateFormated.year} - ${endDateFormated.date} ${endDateFormated?.mon} ${endDateFormated.year}`;
    const eventDate = encodeURIComponent(formattedDate);

    const addImage = `https://res.cloudinary.com/dneebfbfo/image/upload/co_rgb:FFFFFF,c_fit,l_text:Roboto_130_bold:${eventName},c_fit,w_1200/fl_layer_apply/co_rgb:b9b8be,l_text:Roboto_80_bold:${eventArea}/fl_layer_apply,g_south,y_0.1/co_rgb:FFFFFF,l_text:Roboto_50_bold:${eventDate}/fl_layer_apply,g_south,y_0.2/DevResources/dev-resources-event.png`;

    setScriptData({ ...response?.data, image: [addImage] });
  };

  useEffect(() => {
    fetchScriptData();
  }, [node]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(scriptData)}</script>
      </Helmet>
      <div className="confTable flex items-center border-b border-neutrals-100 bg-white hover:bg-whites-800 text-neutrals-400 hover:text-neutrals-600">
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
      </div>
    </>
  );
};

export default IndividualRow;
