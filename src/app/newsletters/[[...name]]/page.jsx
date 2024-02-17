"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEV_RESOURCES, NEWSLETTERS_URL } from "@/utils/constants";
import { addQuotesToString } from "@/utils/utils";
import PageContainer from "@/components/pageContainer";
import {
  clearNewsletterFilters,
  setNewsletterDataByUrl,
  setNewsletterStorageData,
} from "@/redux/features/newsletter/newsletterSlice";
import { fetchNewsletterByAllFilter } from "@/redux/features/newsletter/action";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";

const NewsLetters = ({ name }) => {
  const dispatch = useDispatch();
  const newsletters = useSelector(({ newsletters }) => newsletters);
  const {
    allNewsletters,
    status,
    langSelected,
    audienceSelected,
    tagSelected,
  } = newsletters;

  const fetchData = () => {
    const localStorageResources =
      JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};

    dispatch(setNewsletterStorageData(localStorageResources?.newsletters));

    const convertLang = localStorageResources?.newsletters?.langSelected
      ? addQuotesToString(localStorageResources?.newsletters?.langSelected)
      : undefined;
    const convertAudience = localStorageResources?.newsletters?.audienceSelected
      ? addQuotesToString(localStorageResources?.newsletters?.audienceSelected)
      : undefined;
    const convertTag = localStorageResources?.newsletters?.tagSelected
      ? addQuotesToString(localStorageResources?.newsletters?.tagSelected)
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
    fetchData();
  }, []);

  useEffect(() => {
    if (langSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${NEWSLETTERS_URL}/${audienceSelected}/${langSelected}`
      );
      dispatch(
        setNewsletterDataByUrl({
          langSelected,
          audienceSelected,
          tagSelected,
        })
      );
    } else if (langSelected) {
      window.history.pushState(null, "", `${NEWSLETTERS_URL}/${langSelected}`);
      dispatch(
        setNewsletterDataByUrl({
          langSelected,
          tagSelected,
        })
      );
    } else if (audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${NEWSLETTERS_URL}/${audienceSelected}`
      );
      dispatch(
        setNewsletterDataByUrl({
          audienceSelected,
          tagSelected,
        })
      );
    } else if (tagSelected) {
      dispatch(
        setNewsletterDataByUrl({
          tagSelected,
        })
      );
    } else {
      fetchData();
    }
  }, [langSelected, audienceSelected, tagSelected]);
  return (
    <PageContainer>
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] mt-[30px] lg:mt-[40px]">
        Newsletters
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of the Newsletters
      </p>
      <AudienceFilterBar
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
