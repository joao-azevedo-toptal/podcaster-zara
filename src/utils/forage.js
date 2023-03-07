import localforage from "localforage";
import moment from "moment";

export const writeToLocalForage = async (url, data) => {
  try {
    await localforage.setItem(url, {
      data,
      expiryDate: moment().add(1, "day").valueOf(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const readFromLocalForage = async (url) => {
  try {
    const value = await localforage.getItem(url);

    if (value && moment().isBefore(moment(value.expiryDate))) return value;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const clearLocalForage = async () => {
  try {
    await localforage.clear();
  } catch (error) {
    console.log(error);
  }
};
