import localforage from "localforage";
// Use localStorage for this tests (localStorage is mocked by vitest-localstorage-mock)
localforage.setDriver(localforage.LOCALSTORAGE);

import moment from "moment";
import { readFromLocalForage, writeToLocalForage } from "./forage";

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

  describe("writeToLocalForage", () => {
    test("writes data and expiry date to local storage", async () => {
      await writeToLocalForage(url, data);

      const value = JSON.parse(localStorage.getItem("localforage/" + url));
      expect(value).toBeDefined();
      expect(value.data).toEqual(data);
      expect(value.expiryDate).toBeDefined();
    });

    test("writes a valid expiry date", async () => {
      await writeToLocalForage(url, data);

      const value = JSON.parse(localStorage.getItem("localforage/" + url));
      expect(moment().isBefore(moment(value.expiryDate))).toBe(true);
    });

    test("writen expiry date becomes invalid after one day", async () => {
      await writeToLocalForage(url, data);

      // Add one day to the fake system time to make it expire
      vi.setSystemTime(moment().add(1, "day"));

      const value = JSON.parse(localStorage.getItem("localforage/" + url));
      expect(moment().isBefore(moment(value.expiryDate))).toBe(false);
    });
  });

  describe("readFromLocalForage", () => {
    beforeEach(async () => {
      await writeToLocalForage(url, data);
    });

    test("reads data and expiry date from local storage", async () => {
      const value = await readFromLocalForage(url);

      expect(value).toBeDefined();
      expect(value.data).toEqual(data);
      expect(value.expiryDate).toBeDefined();
    });

    test("reads a valid expiry date", async () => {
      const value = await readFromLocalForage(url);
      expect(moment().isBefore(moment(value.expiryDate))).toBe(true);
    });

    test("doesn't return any value when it expires", async () => {
      // Add one day to the fake system time to make it expire
      vi.setSystemTime(moment().add(1, "day"));

      const value = await readFromLocalForage(url);
      expect(value).toBe(null);
    });
  });
});
