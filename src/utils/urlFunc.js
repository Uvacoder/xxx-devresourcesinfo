import {
  ADDITIONAL_AUDIENCE_URL,
  ADDITIONAL_LANGUAGE_URL,
  ADDITIONAL_ALL_URL,
} from "./constants";
import { removePercent20 } from "./utils";

export const fetchFilterFromURL = (dispatch, setterFunc, urlArr) => {
  if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_AUDIENCE_URL) {
    const langData = removePercent20(urlArr[3]);
    const tagData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        langSelected: langData,
        tagSelected: tagData,
      })
    );
    return { langSelected: langData, tagSelected: tagData };
  } else if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_LANGUAGE_URL) {
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
  } else if (urlArr.length === 4 && urlArr[3] === ADDITIONAL_AUDIENCE_URL) {
    const audData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        audienceSelected: audData,
      })
    );
    return {
      audienceSelected: audData,
    };
  } else if (urlArr.length === 4 && urlArr[3] === ADDITIONAL_LANGUAGE_URL) {
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

export const updateURLAndData = (URL, obj) => {
  const { langSelected, audienceSelected, tagSelected } = obj;
  if (langSelected && audienceSelected && tagSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${audienceSelected}/${langSelected}`
    );
    return `${URL}/${tagSelected}/${audienceSelected}/${langSelected}`;
  } else if (langSelected && audienceSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${audienceSelected}/${langSelected}`
    );
    return `${URL}/${audienceSelected}/${langSelected}`;
  } else if (tagSelected && audienceSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${audienceSelected}/${ADDITIONAL_LANGUAGE_URL}`
    );
    return `${URL}/${tagSelected}/${audienceSelected}/${ADDITIONAL_LANGUAGE_URL}`;
  } else if (tagSelected && langSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${tagSelected}/${langSelected}/${ADDITIONAL_AUDIENCE_URL}`
    );
    return `${URL}/${tagSelected}/${langSelected}/${ADDITIONAL_AUDIENCE_URL}`;
  } else if (langSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${langSelected}/${ADDITIONAL_LANGUAGE_URL}`
    );
    return `${URL}/${langSelected}/${ADDITIONAL_LANGUAGE_URL}`;
  } else if (audienceSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${audienceSelected}/${ADDITIONAL_AUDIENCE_URL}`
    );
    return `${URL}/${audienceSelected}/${ADDITIONAL_AUDIENCE_URL}`;
  } else if (tagSelected) {
    window.history.pushState(null, "", `${URL}/${tagSelected}`);
    return `${URL}/${tagSelected}`;
  } else {
    return `${URL}/`;
  }
};

export const fetchAreaFilterFromURL = (dispatch, setterFunc, urlArr) => {
  if (urlArr.length === 6 && urlArr[5] === ADDITIONAL_ALL_URL) {
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
    return {
      citySelected: cityData,
      countrySelected: countryData,
      continentSelected: continentData,
    };
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
    return {
      citySelected: cityData,
      countrySelected: countryData,
      continentSelected: continentData,
      techSelected: techData,
    };
  } else if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_ALL_URL) {
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        countrySelected: countryData,
        continentSelected: continentData,
      })
    );
    return {
      countrySelected: countryData,
      continentSelected: continentData,
    };
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
    return {
      countrySelected: countryData,
      continentSelected: continentData,
      techSelected: techData,
    };
  } else if (urlArr.length === 4 && urlArr[3] === ADDITIONAL_ALL_URL) {
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        continentSelected: continentData,
      })
    );
    return {
      continentSelected: continentData,
    };
  } else if (urlArr.length === 4) {
    const techData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        continentSelected: continentData,
        techSelected: techData,
      })
    );
    return {
      continentSelected: continentData,
      techSelected: techData,
    };
  } else if (urlArr.length === 3) {
    const techData = removePercent20(urlArr[2]);
    dispatch(
      setterFunc({
        techSelected: techData,
      })
    );
    return {
      techSelected: techData,
    };
  } else {
    return {};
  }
};

export const updateAreaURLAndData = (URL, obj) => {
  const { citySelected, countrySelected, continentSelected, techSelected } =
    obj;
  if (citySelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${citySelected}/${techSelected}`
    );
    return `${URL}/${continentSelected}/${countrySelected}/${citySelected}/${techSelected}`;
  } else if (countrySelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${techSelected}`
    );
    return `${URL}/${continentSelected}/${countrySelected}/${techSelected}`;
  } else if (continentSelected && techSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${techSelected}`
    );
    return `${URL}/${continentSelected}/${techSelected}`;
  } else if (techSelected) {
    window.history.pushState(null, "", `${URL}/${techSelected}`);
    return `${URL}/${techSelected}`;
  } else if (citySelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${citySelected}/${ADDITIONAL_ALL_URL}`
    );
    return `${URL}/${continentSelected}/${countrySelected}/${citySelected}/${ADDITIONAL_ALL_URL}`;
  } else if (countrySelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${countrySelected}/${ADDITIONAL_ALL_URL}`
    );
    return `${URL}/${continentSelected}/${countrySelected}/${ADDITIONAL_ALL_URL}`;
  } else if (continentSelected) {
    window.history.pushState(
      null,
      "",
      `${URL}/${continentSelected}/${ADDITIONAL_ALL_URL}`
    );
    return `${URL}/${continentSelected}/${ADDITIONAL_ALL_URL}`;
  } else {
    return `${URL}/`;
  }
};

export const handleAreaBreadcrumb = (
  dispatch,
  setterFunc,
  urlArr,
  textSelected,
  URL
) => {
  if (urlArr.length === 6 && urlArr[5] === ADDITIONAL_ALL_URL) {
    const countryData = removePercent20(urlArr[3]);
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${ADDITIONAL_ALL_URL}`
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
        `${URL}/${continentData}/${countryData}/${ADDITIONAL_ALL_URL}`
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
        `${URL}/${continentData}/${countryData}/${cityData}/${ADDITIONAL_ALL_URL}`
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
        `${URL}/${continentData}/${countryData}/${ADDITIONAL_ALL_URL}`
      );
    } else if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${ADDITIONAL_ALL_URL}`
      );
    } else {
      return;
    }
  } else if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_ALL_URL) {
    const continentData = removePercent20(urlArr[2]);
    if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${ADDITIONAL_ALL_URL}`
      );
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
        `${URL}/${continentData}/${countryData}/${ADDITIONAL_ALL_URL}`
      );
    } else if (textSelected === continentData) {
      dispatch(
        setterFunc({
          continentSelected: continentData,
        })
      );

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${ADDITIONAL_ALL_URL}`
      );
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

      window.history.pushState(
        null,
        "",
        `${URL}/${continentData}/${ADDITIONAL_ALL_URL}`
      );
    }
  } else {
    return;
  }
};

export const handleAudienceBreadcrumb = (
  dispatch,
  setterFunc,
  urlArr,
  textSelected,
  URL
) => {
  if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_AUDIENCE_URL) {
    const tagData = removePercent20(urlArr[2]);
    if (textSelected === tagData) {
      dispatch(
        setterFunc({
          tagSelected: tagData,
        })
      );
      window.history.pushState(null, "", `${URL}/${tagData}`);
    }
  } else if (urlArr.length === 5 && urlArr[4] === ADDITIONAL_LANGUAGE_URL) {
    const tagData = removePercent20(urlArr[2]);
    if (textSelected === tagData) {
      dispatch(
        setterFunc({
          tagSelected: tagData,
        })
      );
      window.history.pushState(null, "", `${URL}/${tagData}`);
    }
  } else if (urlArr.length === 5) {
    const audData = removePercent20(urlArr[3]);
    const tagData = removePercent20(urlArr[2]);
    if (textSelected === audData) {
      dispatch(
        setterFunc({
          audienceSelected: audData,
          tagSelected: tagData,
        })
      );
      window.history.pushState(
        null,
        "",
        `${URL}/${tagData}/${audData}/${ADDITIONAL_LANGUAGE_URL}`
      );
    } else if (textSelected === tagData) {
      dispatch(
        setterFunc({
          tagSelected: tagData,
        })
      );
      window.history.pushState(null, "", `${URL}/${tagData}`);
    } else {
      return;
    }
  } else if (urlArr.length === 4 && urlArr[3] === ADDITIONAL_AUDIENCE_URL) {
    return;
  } else if (urlArr.length === 4 && urlArr[3] === ADDITIONAL_LANGUAGE_URL) {
    return;
  } else if (urlArr.length === 4) {
    const audData = removePercent20(urlArr[2]);
    if (textSelected === audData) {
      dispatch(
        setterFunc({
          audienceSelected: audData,
        })
      );
      window.history.pushState(
        null,
        "",
        `${URL}/${audData}/${ADDITIONAL_AUDIENCE_URL}`
      );
    }
  } else if (urlArr.length === 3) {
    return;
  } else {
    return;
  }
};
