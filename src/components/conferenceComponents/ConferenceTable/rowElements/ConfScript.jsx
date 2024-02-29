import { getIndividualConfScript } from "@/services/api/conferenceAPI";
import { addQuotesToString, parseDate } from "@/utils/utils";
import Head from "next/head";
import Script from "next/script";
import React from "react";

const ConfScript = async ({ node }) => {
  const fetchScriptData = async (node) => {
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

    const addImageInResponse = { ...response?.data, image: [addImage] };
    const formattedData = {
      ...addImageInResponse,
      "@context": "https://schema.org",
      "@type": "Event",
      offers: { ...addImageInResponse?.offers, "@type": "Offer" },
      performer: {
        ...addImageInResponse?.performer,
        "@type": "PerformingGroup",
      },
      organizer: { ...addImageInResponse?.organizer, "@type": "Organization" },
    };

    return formattedData;
  };

  const formattedData = await fetchScriptData(node);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(formattedData),
        }}
      />
    </>
  );
};

export default ConfScript;
