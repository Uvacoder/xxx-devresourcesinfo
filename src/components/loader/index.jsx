import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-[9rem]">
      <div className="flex w-[80px] h-[40px] md:w-[109px] md:h-[55.88px] justify-center items-center">
        <video
          autoPlay
          loop
          muted
          style={{ width: "109px", height: "55.88px" }}
        >
          <source src="/Animation.webm" type="video/webm" />
        </video>
      </div>
      <p className="text-[14px] md:text-[16px] font-[700] text-center">
        Loading data
      </p>
    </div>
  );
};

export default Loader;
