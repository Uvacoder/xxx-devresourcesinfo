export const initialState = {
  allConferences: [],
  citySelected: "",
  countrySelected: "",
  continentSelected: "",
  techSelected: "",
};

export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "FETCH_CONFERENCES":
      return { ...state, allConferences: action.payload };
    case "SET_CITY":
      return { ...state, citySelected: action.payload };
    case "SET_COUNTRY":
      return { ...state, countrySelected: action.payload };
    case "SET_CONTINENT":
      return { ...state, continentSelected: action.payload };
    case "SET_TECH":
      return { ...state, techSelected: action.payload };
    default:
      return state;
  }
};
