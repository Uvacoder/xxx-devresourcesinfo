export const initialState = {
  allConferences: [],
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  techSelected: "",
  pastConf: false,
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "FETCH_CONFERENCES":
      return { ...state, allConferences: action.payload };
    case "SET_PAST_CONFERENCES":
      return { ...state, pastConf: action.payload };
    case "SET_CITY":
      return {
        ...state,
        citySelected: action.payload,
        countrySelected: "",
        continentSelected: "",
        techSelected: "",
      };
    case "SET_COUNTRY":
      return {
        ...state,
        citySelected: "",
        countrySelected: action.payload,
        continentSelected: "",
        techSelected: "",
      };
    case "SET_CONTINENT":
      return {
        ...state,
        citySelected: "",
        countrySelected: "",
        continentSelected: action.payload,
        techSelected: "",
      };
    case "SET_TECH":
      return {
        ...state,
        citySelected: "",
        countrySelected: "",
        continentSelected: "",
        techSelected: action.payload,
      };
    default:
      return state;
  }
};
