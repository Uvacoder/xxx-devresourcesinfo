import React from "react";

const Loader = () => (
  <div className="flex justify-center mt-[7rem]">
    <video autoPlay loop muted style={{ width: "100px", height: "100px" }}>
      <source src="/Animation.webm" type="video/webm" />
    </video>
  </div>
);

export default Loader;
