"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import PageContainer from "@/components/pageContainer";
import Breadcrumb from "@/components/breadcrumb";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import { addQuotesToString, extractDataFromURL } from "@/utils/utils";
import {
  clearYoutubeFilters,
  setYoutubeDataByUrl,
} from "@/redux/features/youtube/youtubeSlice";
import { fetchYoutubeByAllFilter } from "@/redux/features/youtube/action";
import {
  fetchFilterFromURL,
  handleAudienceBreadcrumb,
  updateURLAndData,
} from "@/utils/urlFunc";
import { YOUTUBE_URL } from "@/utils/constants";
import MobileFilterBar from "@/components/mobileFilterBar";
import NoDataFound from "@/components/noDataFound";
import Loader from "@/components/loader";

const Youtube = ({ name }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const dataFromURL = extractDataFromURL(pathname);
  const youtube = useSelector(({ youtube }) => youtube);
  const { allYoutube, status, langSelected, audienceSelected, tagSelected } =
    youtube;

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
      fetchYoutubeByAllFilter({
        langSelected: convertLang,
        audienceSelected: convertAudience,
        tagSelected: convertTag,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setYoutubeDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, []);

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setYoutubeDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname]);

  useEffect(() => {
    updateURLAndData(YOUTUBE_URL, fetchData, {
      langSelected,
      audienceSelected,
      tagSelected,
    });
  }, [langSelected, audienceSelected, tagSelected]);

  return (
    <PageContainer>
      <Breadcrumb
        page="youtube"
        breadcrumbHandler={handleAudienceBreadcrumb}
        setterFunc={setYoutubeDataByUrl}
        clearFunc={clearYoutubeFilters}
        URL={YOUTUBE_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Youtube
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
        A curated list of
        {langSelected && <span> {langSelected}</span>}
        {tagSelected && <span> {tagSelected}</span>} youtube videos
        {audienceSelected && <span> targeted towards {audienceSelected}</span>}
      </p>
      <AudienceFilterBar
        page="youtube"
        pageState={youtube}
        clearFunc={clearYoutubeFilters}
      />
      <MobileFilterBar
        page="youtube"
        pageState={youtube}
        clearFunc={clearYoutubeFilters}
      />
      {allYoutube.length > 0 ? (
        <AudienceTable
          data={allYoutube}
          page="youtube"
          pageState={youtube}
          filterFunc={fetchYoutubeByAllFilter}
        />
      ) : status === "success" ? (
        <NoDataFound title="youtube" />
      ) : (
        status !== "error" && <Loader />
      )}
    </PageContainer>
  );
};

export default Youtube;
