"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import PageContainer from "@/components/pageContainer";
import AudienceFilterBar from "@/components/audienceFilterBar";
import AudienceTable from "@/components/audienceTable";
import {
  clearBlogFilters,
  setBlogDataByUrl,
} from "@/redux/features/blog/blogSlice";
import { addQuotesToString, extractDataFromURL } from "@/utils/utils";
import { fetchBlogByAllFilter } from "@/redux/features/blog/action";
import {
  fetchFilterFromURL,
  handleAudienceBreadcrumb,
  updateURLAndData,
} from "@/utils/urlFunc";
import { BLOGS_URL } from "@/utils/constants";
import MobileFilterBar from "@/components/mobileFilterBar";
import NoDataFound from "@/components/noDataFound";
import Loader from "@/components/loader";
import AudiencePagination from "@/components/pagination/AudiencePagination";

const Blogs = ({ searchParams }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const dataFromURL = extractDataFromURL(pathname);
  const blogs = useSelector(({ blogs }) => blogs);
  const { allBlogs, status, langSelected, audienceSelected, tagSelected } =
    blogs;

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
    const convertEndCursor = searchParams?.hasEndCursor
      ? addQuotesToString(searchParams?.hasEndCursor)
      : "";
    const convertStartCursor = searchParams?.hasStartCursor
      ? addQuotesToString(searchParams?.hasStartCursor)
      : "";

    const getPage = searchParams?.page ?? "next";

    dispatch(
      fetchBlogByAllFilter({
        langSelected: convertLang,
        audienceSelected: convertAudience,
        tagSelected: convertTag,
        endCursor: convertEndCursor,
        startCursor: convertStartCursor,
        getPage,
      })
    );
  };

  useEffect(() => {
    const filterFromURL = fetchFilterFromURL(
      dispatch,
      setBlogDataByUrl,
      dataFromURL
    );
    fetchData(filterFromURL);
  }, [pathname, searchParams?.hasEndCursor]);

  useEffect(() => {
    updateURLAndData(BLOGS_URL, {
      langSelected,
      audienceSelected,
      tagSelected,
    });
  }, [langSelected, audienceSelected, tagSelected]);
  return (
    <PageContainer>
      <Breadcrumb
        page="blogs"
        breadcrumbHandler={handleAudienceBreadcrumb}
        setterFunc={setBlogDataByUrl}
        clearFunc={clearBlogFilters}
        URL={BLOGS_URL}
      />
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] leading-[100%]">
        Blogs
      </h1>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[25px] md:pb-[48px]">
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
      <MobileFilterBar
        page="blogs"
        pageState={blogs}
        clearFunc={clearBlogFilters}
      />
      {allBlogs.length > 0 ? (
        <AudienceTable
          data={allBlogs}
          page="blogs"
          pageState={blogs}
          filterFunc={fetchBlogByAllFilter}
        />
      ) : status === "success" ? (
        <NoDataFound title="blogs" />
      ) : (
        status !== "error" && <Loader />
      )}
      <AudiencePagination stateObj={blogs} URL={BLOGS_URL} />
    </PageContainer>
  );
};

export default Blogs;
