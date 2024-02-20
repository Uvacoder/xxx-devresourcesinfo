import { removePercent20 } from "./utils";

export const fetchFilterFromURL = (dispatch, setterFunc, urlArr) => {
  if (urlArr.length === 5 && urlArr[4] === "allDev") {
    const langData = removePercent20(urlArr[3]);
    const tagData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        langSelected: langData,
        tagSelected: tagData,
      })
    );
    return { langSelected: langData, tagSelected: tagData };
  } else if (urlArr.length === 5 && urlArr[4] === "allLang") {
    const audData = removePercent20(urlArr[3]);
    const tagData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        audienceSelected: audData,
        tagSelected: tagData,
      })
    );
    return { audienceSelected: audData, tagSelected: tagData };
  } else if (urlArr.length === 5) {
    const langData = removePercent20(urlArr[4]);
    const audData = removePercent20(urlArr[3]);
    const tagData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        langSelected: langData,
        audienceSelected: audData,
        tagSelected: tagData,
      })
    );
    return {
      langSelected: langData,
      audienceSelected: audData,
      tagSelected: tagData,
    };
  } else if (urlArr.length === 4 && urlArr[3] === "allDev") {
    const audData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        audienceSelected: audData,
      })
    );
    return {
      audienceSelected: audData,
    };
  } else if (urlArr.length === 4 && urlArr[3] === "allLang") {
    const langData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        langSelected: langData,
      })
    );
    return { langSelected: langData };
  } else if (urlArr.length === 4) {
    const langData = removePercent20(urlArr[3]);
    const audData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        langSelected: langData,
        audienceSelected: audData,
      })
    );
    return { langSelected: langData, audienceSelected: audData };
  } else if (urlArr.length === 3) {
    const tagData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        tagSelected: tagData,
      })
    );
    return { tagSelected: tagData };
  } else {
    return {};
  }
};

export const updateURLAndData = (URL, fetchData, obj) => {
  const { langSelected, audienceSelected, tagSelected } = obj;
  if (langSelected && audienceSelected && tagSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${audienceSelected}/${langSelected}`
    );
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (langSelected && audienceSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${audienceSelected}/${langSelected}`
    );
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (tagSelected && audienceSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${audienceSelected}/allLang`
    );
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (tagSelected && langSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${langSelected}/allDev`
    );
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (langSelected) {
    window.history.pushState(null, "", `${URL}/${langSelected}/allLang`);
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (audienceSelected) {
    window.history.pushState(null, "", `${URL}/${audienceSelected}/allDev`);
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else if (tagSelected) {
    window.history.pushState(null, "", `${URL}/${tagSelected}`);
    fetchData({ langSelected, audienceSelected, tagSelected });
  } else {
    fetchData({ langSelected, audienceSelected, tagSelected });
  }
};
