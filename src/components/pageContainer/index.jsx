import React from "react";

const PageContainer = ({ children }) => {
  return (
    <main className="max-w-[1400px] m-auto pt-[30px] sm:pt-[38px] lg:pt-[48px]">
      {children}
    </main>
  );
};

export default PageContainer;
