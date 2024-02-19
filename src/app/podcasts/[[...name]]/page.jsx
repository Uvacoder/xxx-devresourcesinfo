"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPodcastByAllFilter } from "@/redux/features/podcast/action";
import PageContainer from "@/components/pageContainer";
import {
  clearPodcastFilters,
  setPodcastDataByUrl,
  setPodcastStorageData,
} from "@/redux/features/podcast/podcastSlice";
import { addQuotesToString } from "@/utils/utils";
import { DEV_RESOURCES, PODCASTS_URL } from "@/utils/constants";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import Breadcrumb from "@/components/breadcrumb";

const Podcasts = ({ params: { name } }) => {
  const dispatch = useDispatch();
  const podcasts = useSelector(({ podcasts }) => podcasts);
  const { allPodcasts, status, langSelected, audienceSelected, tagSelected } =
    podcasts;
  const fetchData = () => {
    const localStorageResources =
      JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};

    dispatch(setPodcastStorageData(localStorageResources?.podcasts));

    const convertLang = localStorageResources?.podcasts?.langSelected
      ? addQuotesToString(localStorageResources?.podcasts?.langSelected)
      : undefined;
    const convertAudience = localStorageResources?.podcasts?.audienceSelected
      ? addQuotesToString(localStorageResources?.podcasts?.audienceSelected)
      : undefined;
    const convertTag = localStorageResources?.podcasts?.tagSelected
      ? addQuotesToString(localStorageResources?.podcasts?.tagSelected)
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
    fetchData();
  }, []);

  useEffect(() => {
    if (langSelected && audienceSelected && tagSelected) {
      window.history.pushState(
        null,
        "",
        `${PODCASTS_URL}/${tagSelected}/${audienceSelected}/${langSelected}`
      );
      dispatch(
        setPodcastDataByUrl({
          langSelected,
          audienceSelected,
          tagSelected,
        })
      );
    } else if (langSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${PODCASTS_URL}/${audienceSelected}/${langSelected}`
      );
      dispatch(
        setPodcastDataByUrl({
          langSelected,
          audienceSelected,
        })
      );
    } else if (tagSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${PODCASTS_URL}/${tagSelected}/${audienceSelected}`
      );
      dispatch(
        setPodcastDataByUrl({
          audienceSelected,
          tagSelected,
        })
      );
    } else if (tagSelected && langSelected) {
      window.history.pushState(
        null,
        "",
        `${PODCASTS_URL}/${tagSelected}/${langSelected}`
      );
      dispatch(
        setPodcastDataByUrl({
          langSelected,
          tagSelected,
        })
      );
    } else if (langSelected) {
      window.history.pushState(null, "", `${PODCASTS_URL}/${langSelected}`);
      dispatch(
        setPodcastDataByUrl({
          langSelected,
        })
      );
    } else if (audienceSelected) {
      window.history.pushState(null, "", `${PODCASTS_URL}/${audienceSelected}`);
      dispatch(
        setPodcastDataByUrl({
          audienceSelected,
        })
      );
    } else if (tagSelected) {
      window.history.pushState(null, "", `${PODCASTS_URL}/${tagSelected}`);
      dispatch(
        setPodcastDataByUrl({
          tagSelected,
        })
      );
    } else {
      fetchData();
    }
  }, [langSelected, audienceSelected, tagSelected]);

  return (
    <PageContainer>
      <Breadcrumb />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Podcasts
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
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
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allPodcasts.length > 0 ? (
        <AudienceTable
          data={allPodcasts}
          page="podcasts"
          pageState={podcasts}
          filterFunc={fetchPodcastByAllFilter}
        />
      ) : (
        status === "success" && <p>No podcasts found!</p>
      )}
    </PageContainer>
  );
};

export default Podcasts;
