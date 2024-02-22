"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { fetchNewsletterByAllFilter } from "@/redux/features/newsletter/action";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import Breadcrumb from "@/components/breadcrumb";
import { addQuotesToString, extractDataFromURL } from "@/utils/utils";
import {
  clearNewsletterFilters,
  setNewsletterDataByUrl,
} from "@/redux/features/newsletter/newsletterSlice";
import {
  fetchFilterFromURL,
  handleAudienceBreadcrumb,
  updateURLAndData,
} from "@/utils/urlFunc";
import { NEWSLETTERS_URL } from "@/utils/constants";
import MobileFilterBar from "@/components/mobileFilterBar";

const NewsLetters = ({ name }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const dataFromURL = extractDataFromURL(pathname);
  const newsletters = useSelector(({ newsletters }) => newsletters);
  const {
    allNewsletters,
    status,
    langSelected,
    audienceSelected,
    tagSelected,
  } = newsletters;

  const fetchData = (obj) => {
    const convertLang = obj?.langSelected
      ? addQuotesToString(obj?.langSelected)
      : undefined;
    const convertAudience = obj?.audienceSelected
      ? addQuotesToString(obj?.audienceSelected)
      : undefined;
    const convertTag = obj?.tagSelected
      ? addQuotesToString(obj?.tagSelected)
      : undefined;

    dispatch(
      fetchNewsletterByAllFilter({
        langSelected: convertLang,
        audienceSelected: convertAudience,
        tagSelected: convertTag,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setNewsletterDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, []);

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setNewsletterDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname]);

  useEffect(() => {
    updateURLAndData(NEWSLETTERS_URL, fetchData, {
      langSelected,
      audienceSelected,
      tagSelected,
    });
  }, [langSelected, audienceSelected, tagSelected]);
  return (
    <PageContainer>
      <Breadcrumb
        page="newsletters"
        breadcrumbHandler={handleAudienceBreadcrumb}
        setterFunc={setNewsletterDataByUrl}
        clearFunc={clearNewsletterFilters}
        URL={NEWSLETTERS_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Newsletters
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
        A curated list of
        {langSelected && <span> {langSelected}</span>}
        {tagSelected && <span> {tagSelected}</span>} newsletters
        {audienceSelected && <span> targeted towards {audienceSelected}</span>}
      </p>
      <AudienceFilterBar
        page="newsletters"
        pageState={newsletters}
        clearFunc={clearNewsletterFilters}
      />
      <MobileFilterBar
        page="newsletters"
        pageState={newsletters}
        clearFunc={clearNewsletterFilters}
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allNewsletters.length > 0 ? (
        <AudienceTable
          data={allNewsletters}
          page="newsletters"
          pageState={newsletters}
          filterFunc={fetchNewsletterByAllFilter}
        />
      ) : (
        status === "success" && <p>No newsletters found!</p>
      )}
    </PageContainer>
  );
};

export default NewsLetters;