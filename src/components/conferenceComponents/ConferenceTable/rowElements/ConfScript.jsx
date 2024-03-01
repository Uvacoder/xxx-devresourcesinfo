import { parseDate } from "@/utils/utils";
import React from "react";

const ConfScript = async ({ node }) => {
  let addEventStatus;
  let addEventAttendanceMode;

  if (node?.city?.name === "Online") {
    addEventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode";
  } else {
    addEventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";
  }

  const givenDate = new Date(node?.startDate);
  const currentDate = new Date();

  if (givenDate < currentDate) {
    addEventStatus = "";
  } else {
    addEventStatus = "https://schema.org/EventScheduled";
  }

  const eventName = encodeURIComponent(node?.name);

  const area = `${node?.city?.name}, ${node?.country[0]?.name}, ${node?.continent[0]?.name}`;
  const eventArea = encodeURIComponent(area);

  let formattedDate;
  const startDateFormated = parseDate(node?.startDate);
  if (node?.endDate) {
    const endDateFormated = node?.endDate && parseDate(node?.endDate);
    formattedDate = `${startDateFormated.date} ${startDateFormated?.mon} ${startDateFormated.year} - ${endDateFormated.date} ${endDateFormated?.mon} ${endDateFormated.year}`;
  } else {
    formattedDate = `${startDateFormated.date} ${startDateFormated?.mon} ${startDateFormated.year}`;
  }
  const eventDate = encodeURIComponent(formattedDate);

  const addImage = `https://res.cloudinary.com/dneebfbfo/image/upload/co_rgb:FFFFFF,c_fit,l_text:Roboto_130_bold:${eventName},c_fit,w_1200/fl_layer_apply/co_rgb:b9b8be,l_text:Roboto_80_bold:${eventArea}/fl_layer_apply,g_south,y_0.1/co_rgb:FFFFFF,l_text:Roboto_50_bold:${eventDate}/fl_layer_apply,g_south,y_0.2/DevResources/dev-resources-event.png`;

  const addLocation = {
    "@type": "Place",
    name: node?.city?.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: node?.city?.name,
      addressRegion: node?.continent[0]?.name,
      addressCountry: node?.country[0]?.name,
    },
  };
  const formattedData = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: node?.name,
    startDate: node?.startDate,
    startDate: node?.endDate,
    eventAttendanceMode: addEventAttendanceMode,
    eventStatus: addEventStatus,
    location: addLocation,
    image: [addImage],
    organizer: {
      "@type": "Organization",
      name: node?.organizerName,
      url: node?.organizerUrl,
    },
  };

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
