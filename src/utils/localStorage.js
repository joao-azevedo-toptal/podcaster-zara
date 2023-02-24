import moment from "moment";

export const writeToLocalStorage = (url, data) => {
  localStorage.setItem(
    url,
    JSON.stringify({ data, expiryDate: moment().add(1, "day").valueOf() })
  );
};

export const readFromLocalStorage = (url) => {
  const value = JSON.parse(localStorage.getItem(url)) || null;

  if (value && moment().isBefore(moment(value.expiryDate))) return value;
  return null;
};
