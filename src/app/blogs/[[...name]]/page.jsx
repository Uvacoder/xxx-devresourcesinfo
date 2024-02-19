"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEV_RESOURCES, BLOGS_URL } from "@/utils/constants";
import { addQuotesToString } from "@/utils/utils";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import {
  clearBlogFilters,
  setBlogDataByUrl,
  setBlogStorageData,
} from "@/redux/features/blog/blogSlice";
import { fetchBlogByAllFilter } from "@/redux/features/blog/action";
import Breadcrumb from "@/components/breadcrumb";

const Blogs = ({ name }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const { allBlogs, status, langSelected, audienceSelected, tagSelected } =
    blogs;

  const fetchData = () => {
    const localStorageResources =
      JSON.parse(localStorage.getItem(DEV_RESOURCES)) ?? {};

    dispatch(setBlogStorageData(localStorageResources?.blogs));

    const convertLang = localStorageResources?.blogs?.langSelected
      ? addQuotesToString(localStorageResources?.blogs?.langSelected)
      : undefined;
    const convertAudience = localStorageResources?.blogs?.audienceSelected
      ? addQuotesToString(localStorageResources?.blogs?.audienceSelected)
      : undefined;
    const convertTag = localStorageResources?.blogs?.tagSelected
      ? addQuotesToString(localStorageResources?.blogs?.tagSelected)
      : undefined;

    dispatch(
      fetchBlogByAllFilter({
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
    if (langSelected && tagSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${BLOGS_URL}/${tagSelected}/${audienceSelected}/${langSelected}`
      );
      dispatch(
        setBlogDataByUrl({
          langSelected,
          audienceSelected,
          tagSelected,
        })
      );
    } else if (langSelected && tagSelected) {
      window.history.pushState(
        null,
        "",
        `${BLOGS_URL}/${tagSelected}/${langSelected}`
      );
      dispatch(
        setBlogDataByUrl({
          langSelected,
          tagSelected,
        })
      );
    } else if (tagSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${BLOGS_URL}/${tagSelected}/${audienceSelected}`
      );
      dispatch(
        setBlogDataByUrl({
          audienceSelected,
          tagSelected,
        })
      );
    } else if (langSelected && audienceSelected) {
      window.history.pushState(
        null,
        "",
        `${BLOGS_URL}/${audienceSelected}/${langSelected}`
      );
      dispatch(
        setBlogDataByUrl({
          langSelected,
          audienceSelected,
        })
      );
    } else if (langSelected) {
      window.history.pushState(null, "", `${BLOGS_URL}/${langSelected}`);
      dispatch(
        setBlogDataByUrl({
          langSelected,
          tagSelected,
        })
      );
    } else if (audienceSelected) {
      window.history.pushState(null, "", `${BLOGS_URL}/${audienceSelected}`);
      dispatch(
        setBlogDataByUrl({
          audienceSelected,
          tagSelected,
        })
      );
    } else if (tagSelected) {
      window.history.pushState(null, "", `${BLOGS_URL}/${tagSelected}`);
      dispatch(
        setBlogDataByUrl({
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
        Blogs
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of
        {langSelected && <span> {langSelected}</span>}
        {tagSelected && <span> {tagSelected}</span>} blogs
        {audienceSelected && <span> targeted towards {audienceSelected}</span>}
      </p>
      <AudienceFilterBar
        page="blogs"
        pageState={blogs}
        clearFunc={clearBlogFilters}
      />
      {status === "loading" ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : allBlogs.length > 0 ? (
        <AudienceTable
          data={allBlogs}
          page="blogs"
          pageState={blogs}
          filterFunc={fetchBlogByAllFilter}
        />
      ) : (
        status === "success" && <p>No blogs found!</p>
      )}
    </PageContainer>
  );
};

export default Blogs;
