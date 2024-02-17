"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEV_RESOURCES, YOUTUBE_URL } from "@/utils/constants";
import { addQuotesToString } from "@/utils/utils";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import {
  clearYoutubeFilters,
  setYoutubeDataByUrl,
  setYoutubeStorageData,
} from "@/redux/features/youtube/youtubeSlice";
import { fetchYoutubeByAllFilter } from "@/redux/features/youtube/action";

const Youtube = ({ name }) => {
  const dispatch = useDispatch();
  const youtube = useSelector(({ youtube }) => youtube);
  const { allYoutube, status, langSelected, audienceSelected, tagSelected } =
    youtube;

  const fetchData = () => {
    const localStorageResources =
      JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};

    dispatch(setYoutubeStorageData(localStorageResources?.youtube));

    const convertLang = localStorageResources?.youtube?.langSelected
      ? addQuotesToString(localStorageResources?.youtube?.langSelected)
      : undefined;
    const convertAudience = localStorageResources?.youtube?.audienceSelected
      ? addQuotesToString(localStorageResources?.youtube?.audienceSelected)
      : undefined;
    const convertTag = localStorageResources?.youtube?.tagSelected
      ? addQuotesToString(localStorageResources?.youtube?.tagSelected)
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
    fetchData();
  }, []);

  useEffect(() => {
    if (langSelected && audienceSelected) {
      window.history.pushState(null, "", `${YOUTUBE_URL}/${audienceSelected}`);
      dispatch(
        setYoutubeDataByUrl({
          langSelected,
          audienceSelected,
          tagSelected,
        })
      );
    } else if (langSelected) {
      dispatch(
        setYoutubeDataByUrl({
          langSelected,
          tagSelected,
        })
      );
    } else if (audienceSelected) {
      window.history.pushState(null, "", `${YOUTUBE_URL}/${audienceSelected}`);
      dispatch(
        setYoutubeDataByUrl({
          audienceSelected,
          tagSelected,
        })
      );
    } else if (tagSelected) {
      dispatch(
        setYoutubeDataByUrl({
          tagSelected,
        })
      );
    } else {
      fetchData();
    }
  }, [langSelected, audienceSelected, tagSelected]);
  return (
    <PageContainer>
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Youtube
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of the Youtube
      </p>
      <AudienceFilterBar
        page="youtube"
        pageState={youtube}
        clearFunc={clearYoutubeFilters}
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allYoutube.length > 0 ? (
        <AudienceTable
          data={allYoutube}
          page="youtube"
          pageState={youtube}
          filterFunc={fetchYoutubeByAllFilter}
        />
      ) : (
        status === "success" && <p>No youtube data found!</p>
      )}
    </PageContainer>
  );
};

export default Youtube;
