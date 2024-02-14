import React from "react";

const PageContainer = ({ children }) => {
  return (
    <main className="min-h-[750px] pt-[46px] sm:pt-[64px] lg:pt-[84px]">
      {children}
    </main>
  );
};

export default PageContainer;
