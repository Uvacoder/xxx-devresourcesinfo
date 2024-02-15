"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PodcastTable from "@/components/podcastTable";
import { fetchAllPodcasts } from "@/redux/features/podcast/action";
import PodcastFilterBar from "@/components/podcastFilterBar";
import PageContainer from "@/components/pageContainer";
import Loader from "@/components/reusable/Loader";

const Podcasts = () => {
  const dispatch = useDispatch();
  const { allPodcasts, status } = useSelector(({ podcasts }) => podcasts);
  useEffect(() => {
    dispatch(fetchAllPodcasts());
  }, []);

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
        <Loader />
      ) : allPodcasts.length > 0 ? (
        <PodcastTable data={allPodcasts} />
      ) : (
        status === "success" && <p>No podcasts found!</p>
      )}
    </PageContainer>
  );
};

export default Podcasts;
