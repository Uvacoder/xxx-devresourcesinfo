import React from "react";

const Continent = ({ node, clickHandler }) => {
  return (
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
  );
};

export default Continent;
