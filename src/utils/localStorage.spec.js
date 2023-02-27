import moment from "moment";
import { readFromLocalStorage, writeToLocalStorage } from "./localStorage";

import {
  mockTopPodcastsUrl as url,
  mockTopPodcastsData as data,
} from "../testsMockData";

describe("local storage", () => {
  beforeEach(() => {
    // Tell vitest we use mocked time
    vi.useFakeTimers();
    // Start each test with a empty mocked localStorage
    localStorage.clear();
  });

  afterEach(() => {
    // Restoring date after each test run
    vi.useRealTimers();
  });

  describe("writeToLocalStorage", () => {
    test("writes data and expiry date to local storage", () => {
      writeToLocalStorage(url, data);

      const value = JSON.parse(localStorage.getItem(url));
      expect(value).toBeDefined();
      expect(value.data).toEqual(data);
      expect(value.expiryDate).toBeDefined();
    });

    test("writes a valid expiry date", () => {
      writeToLocalStorage(url, data);

      const value = JSON.parse(localStorage.getItem(url));
      expect(moment().isBefore(moment(value.expiryDate))).toBe(true);
    });

    test("writen expiry date becomes invalid after one day", () => {
      writeToLocalStorage(url, data);

      // Add one day to the fake system time to make it expire
      vi.setSystemTime(moment().add(1, "day"));

      const value = JSON.parse(localStorage.getItem(url));
      expect(moment().isBefore(moment(value.expiryDate))).toBe(false);
    });
  });

  describe("readFromLocalStorage", () => {
    beforeEach(() => {
      writeToLocalStorage(url, data);
    });

    test("reads data and expiry date from local storage", () => {
      const value = readFromLocalStorage(url);

      expect(value).toBeDefined();
      expect(value.data).toEqual(data);
      expect(value.expiryDate).toBeDefined();
    });

    test("reads a valid expiry date", () => {
      const value = readFromLocalStorage(url);
      expect(moment().isBefore(moment(value.expiryDate))).toBe(true);
    });

    test("doesn't return any value when it expires", () => {
      // Add one day to the fake system time to make it expire
      vi.setSystemTime(moment().add(1, "day"));

      const value = readFromLocalStorage(url);
      expect(value).toBe(null);
    });
  });
});
