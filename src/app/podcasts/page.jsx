"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodcastTable from "@/components/podcastTable";
import { fetchAllPodcasts } from "@/redux/features/podcast/action";
import PodcastFilterBar from "@/components/podcastFilterBar";

const Podcasts = () => {
  const dispatch = useDispatch();
  const { allPodcasts, status } = useSelector(({ podcasts }) => podcasts);
  useEffect(() => {
    dispatch(fetchAllPodcasts());
  }, []);

  return (
    <main className="min-h-[750px] pt-[46px] sm:pt-[64px] lg:pt-[84px]">
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
    </main>
  );
};

export default Podcasts;
