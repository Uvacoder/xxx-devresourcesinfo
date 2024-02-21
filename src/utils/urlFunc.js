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

/*****************************************/

export const fetchAreaFilterFromURL = (
  dispatch,
  setterFunc,
  urlArr,
  fetchData
) => {
  if (urlArr.length === 6 && urlArr[5] === "all") {
    const cityData = removePercent20(urlArr[4]);
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        citySelected: cityData,
        countrySelected: countryData,
        continentSelected: continentData,
      })
    );
    fetchData({
      citySelected: cityData,
      countrySelected: countryData,
      continentSelected: continentData,
    });
  } else if (urlArr.length === 6) {
    const techData = removePercent20(urlArr[5]);
    const cityData = removePercent20(urlArr[4]);
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        citySelected: cityData,
        countrySelected: countryData,
        continentSelected: continentData,
        techSelected: techData,
      })
    );
    fetchData({
      citySelected: cityData,
      countrySelected: countryData,
      continentSelected: continentData,
      techSelected: techData,
    });
  } else if (urlArr.length === 5 && urlArr[4] === "all") {
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        countrySelected: countryData,
        continentSelected: continentData,
      })
    );
    fetchData({
      countrySelected: countryData,
      continentSelected: continentData,
    });
  } else if (urlArr.length === 5) {
    const techData = removePercent20(urlArr[4]);
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        countrySelected: countryData,
        continentSelected: continentData,
        techSelected: techData,
      })
    );
    fetchData({
      countrySelected: countryData,
      continentSelected: continentData,
      techSelected: techData,
    });
  } else if (urlArr.length === 4 && urlArr[3] === "all") {
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        continentSelected: continentData,
      })
    );
    fetchData({
      continentSelected: continentData,
    });
  } else if (urlArr.length === 4) {
    const techData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        continentSelected: continentData,
        techSelected: techData,
      })
    );
    fetchData({
      continentSelected: continentData,
      techSelected: techData,
    });
  } else if (urlArr.length === 3) {
    const techData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        techSelected: techData,
      })
    );
    fetchData({
      techSelected: techData,
    });
  } else {
    return;
  }
};

export const updateAreaURLAndData = (URL, fetchData, obj) => {
  const { citySelected, countrySelected, continentSelected, techSelected } =
    obj;
  if (citySelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${citySelected}/${techSelected}`
    );
  } else if (countrySelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${techSelected}`
    );
  } else if (continentSelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${techSelected}`
    );
  } else if (techSelected) {
    window.history.pushState(null, "", `${URL}/${techSelected}`);
  } else if (citySelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${citySelected}/all`
    );
  } else if (countrySelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/all`
    );
  } else if (continentSelected) {
    window.history.pushState(null, "", `${URL}/${continentSelected}/all`);
  } else {
    fetchData({
      citySelected,
      countrySelected,
      continentSelected,
      techSelected,
    });
    return;
  }
};

/********************* BreadCrumbs**********************/

export const handleAreaBreadcrumb = (
  dispatch,
  setterFunc,
  urlArr,
  textSelected
) => {
  if (urlArr.length === 6 && urlArr[5] === "all") {
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(null, "", `${URL}/${continentData}/all`);
    } else if (textSelected === countryData) {
      dispatch(
        setterFunc({
          countrySelected: countryData,
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${countryData}/all`
      );
    } else {
      return;
    }
  } else if (urlArr.length === 6) {
    const cityData = removePercent20(urlArr[4]);
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === cityData) {
      dispatch(
        setterFunc({
          citySelected: cityData,
          countrySelected: countryData,
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${countryData}/${cityData}/all`
      );
    } else if (textSelected === countryData) {
      dispatch(
        setterFunc({
          countrySelected: countryData,
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${countryData}/all`
      );
    } else if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(null, "", `${URL}/${continentData}/all`);
    } else {
      return;
    }
  } else if (urlArr.length === 5 && urlArr[4] === "all") {
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(null, "", `${URL}/${continentData}/all`);
    } else {
      return;
    }
  } else if (urlArr.length === 5) {
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === countryData) {
      dispatch(
        setterFunc({
          countrySelected: countryData,
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${countryData}/all`
      );
    } else if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(null, "", `${URL}/${continentData}/all`);
    } else {
      return;
    }
  } else if (urlArr.length === 4) {
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(null, "", `${URL}/${continentData}/all`);
    }
  } else {
    return;
  }
};
