"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { fetchPodcastByAllFilter } from "@/redux/features/podcast/action";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import Breadcrumb from "@/components/breadcrumb";
import {
  clearPodcastFilters,
  setPodcastDataByUrl,
} from "@/redux/features/podcast/podcastSlice";
import { addQuotesToString, extractDataFromURL } from "@/utils/utils";
import {
  fetchFilterFromURL,
  handleAudienceBreadcrumb,
  updateURLAndData,
} from "@/utils/urlFunc";
import { PODCASTS_URL } from "@/utils/constants";
import MobileFilterBar from "@/components/mobileFilterBar";
import NoDataFound from "@/components/noDataFound";
import Loader from "@/components/loader";

const Podcasts = ({ params: { name } }) => {
  const dispatch = useDispatch();
  const podcasts = useSelector(({ podcasts }) => podcasts);
  const { allPodcasts, status, langSelected, audienceSelected, tagSelected } =
    podcasts;

  const pathname = usePathname();
  const dataFromURL = extractDataFromURL(pathname);

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
      fetchPodcastByAllFilter({
        langSelected: convertLang,
        audienceSelected: convertAudience,
        tagSelected: convertTag,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setPodcastDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname]);

  useEffect(() => {
    updateURLAndData(PODCASTS_URL, fetchData, {
      langSelected,
      audienceSelected,
      tagSelected,
    });
  }, [langSelected, audienceSelected, tagSelected]);

  return (
    <PageContainer>
      <Breadcrumb
        page="podcasts"
        breadcrumbHandler={handleAudienceBreadcrumb}
        setterFunc={setPodcastDataByUrl}
        clearFunc={clearPodcastFilters}
        URL={PODCASTS_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Podcasts
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
        A curated list of
        {langSelected && <span> {langSelected}</span>}
        {tagSelected && <span> {tagSelected}</span>} podcasts
        {audienceSelected && <span> targeted towards {audienceSelected}</span>}
      </p>
      <AudienceFilterBar
        page="podcasts"
        pageState={podcasts}
        clearFunc={clearPodcastFilters}
      />
      <MobileFilterBar
        page="podcasts"
        pageState={podcasts}
        clearFunc={clearPodcastFilters}
      />
      {allPodcasts.length > 0 ? (
        <AudienceTable
          data={allPodcasts}
          page="podcasts"
          pageState={podcasts}
          filterFunc={fetchPodcastByAllFilter}
        />
      ) : status === "success" ? (
        <NoDataFound title="podcasts" />
      ) : (
        status !== "error" && <Loader />
      )}
    </PageContainer>
  );
};

export default Podcasts;
