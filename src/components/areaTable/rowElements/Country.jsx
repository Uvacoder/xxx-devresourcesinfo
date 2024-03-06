import React from "react";

const Country = ({ node, clickHandler, continent }) => {
  return (
    <span
      className="hover:font-[700] hover:underline hover:text-primary-end cursor-pointer"
      onClick={() =>
        clickHandler(node?.country[0]?.name, "Country", node?.country[0]?.id)
      }
    >
      {node?.country[0]?.name}
      {continent && ", "}
    </span>
  );
};

export default Country;
