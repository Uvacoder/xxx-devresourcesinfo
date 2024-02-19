export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const addQuotesToString = (inputString) => {
  return `"${inputString}"`;
};

export const parseDate = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month, date] = dateString.split("-");
  return {
    mon: months[parseInt(month, 10) - 1],
    year: parseInt(year, 10),
    date: parseInt(date, 10),
  };
};

export const clearFiltersFromURL = (path) => {
  const pathname = window.location.pathname;
  if (pathname.startsWith(path + "/") && pathname !== path) {
    window.history.replaceState(null, "", path);
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
