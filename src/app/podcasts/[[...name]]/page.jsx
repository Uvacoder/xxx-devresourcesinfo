"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodcastTable from "@/components/podcastTable";
import { fetchPodcastByAllFilter } from "@/redux/features/podcast/action";
import PodcastFilterBar from "@/components/podcastFilterBar";
import PageContainer from "@/components/pageContainer";
import {
  setPodcastDataByUrl,
  setPodcastStorageData,
} from "@/redux/features/podcast/podcastSlice";
import { addQuotesToString } from "@/utils/utils";
import { DEV_RESOURCES, PODCASTS_URL } from "@/utils/constants";

const Podcasts = ({ params: { name } }) => {
  const dispatch = useDispatch();
  const { allPodcasts, status, langSelected, audienceSelected, tagSelected } =
    useSelector(({ podcasts }) => podcasts);

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
    const convertTag = tagSelected ? addQuotesToString(tagSelected) : undefined;

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
    if (langSelected && audienceSelected) {
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
    } else {
      fetchData();
    }
  }, [langSelected, audienceSelected, tagSelected]);

  return (
    <PageContainer>
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] mt-[30px] lg:mt-[40px]">
        Podcasts
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of the Podcasts
      </p>
      <PodcastFilterBar />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allPodcasts.length > 0 ? (
        <PodcastTable data={allPodcasts} />
      ) : (
        status === "success" && <p>No podcasts found!</p>
      )}
    </PageContainer>
  );
};

export default Podcasts;
