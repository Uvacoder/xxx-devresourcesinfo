import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-[2px] sm:gap-1 py-[24px] px-[16px] text-center text-neutrals-600">
      <p className="text-[13px] sm:text-[15px]">
        © 2024 All rights reserved - DevResources from BugFender®
      </p>
      <p className="text-[12px] sm:text-[14px]">
        Please read the{" "}
        <Link
          href="https://bugfender.com/terms-of-service/"
          target="_blank"
          className="underline font-semibold hover:text-primary-end"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="https://bugfender.com/privacy-policy/"
          target="_blank"
          className="underline font-semibold hover:text-primary-end"
          rel="noopener noreferrer"
        >
          {" "}
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default Footer;
