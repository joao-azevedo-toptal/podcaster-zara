import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUseApiInsteadOfFeedUrl,
  setUseDarkMode,
  setWaitBeforeShowView,
} from "../store/appReducer";
import { clearAllStorage } from "../utils/forage";
import CogIcon from "./CogIcon";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";
import TrashIcon from "./TrashIcon";

export default function Settings() {
  const dispatch = useDispatch();
  const useApiInsteadOfFeedUrl = useSelector(
    (state) => state.app.useApiInsteadOfFeedUrl
  );
  const waitBeforeShowView = useSelector(
    (state) => state.app.waitBeforeShowView
  );
  const useDarkMode = useSelector((state) => state.app.useDarkMode);

  const [isOpen, setIsOpen] = useState(false);

  const openSettings = () => {
    document.body.classList.add("overflow-y-hidden");
    setIsOpen(true);
  };

  const closeSettings = () => {
    document.body.classList.remove("overflow-y-hidden");
    setIsOpen(false);
  };

  const onUseApiInsteadOfFeedUrl = (e) => {
    dispatch(setUseApiInsteadOfFeedUrl(e?.target?.checked || false));
  };

  const onWaitBeforeShowView = (e) => {
    dispatch(setWaitBeforeShowView(e?.target?.value || 200));
  };

  const toggleDarkMode = () => {
    dispatch(setUseDarkMode(!useDarkMode));
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-neutral-100 hover:text-blue-500 dark:hover:text-blue-500 rounded-lg focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-900 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 inline-flex h-8 w-8"
        onClick={openSettings}
      >
        <CogIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-10"
            onClick={closeSettings}
          ></div>
          <div className="absolute top-0 right-0 z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHelperButton"
            >
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex items-center h-5">
                    <input
                      id="episodes-from-api"
                      aria-describedby="helper-checkbox-text-1"
                      type="checkbox"
                      checked={useApiInsteadOfFeedUrl}
                      onChange={onUseApiInsteadOfFeedUrl}
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="episodes-from-api"
                      className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                      <div>Enable episodes from API</div>
                      <p
                        id="helper-checkbox-text-1"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Episodes will be fetched from the API instead of the RSS
                        feed.
                      </p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="font-medium text-gray-900 dark:text-gray-300">
                    <div>Views delay</div>
                    <p
                      id="helper-checkbox-text-1"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Artificial timeout in ms to delay views when changing
                      routes.
                    </p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="default-range"
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={waitBeforeShowView}
                      onChange={onWaitBeforeShowView}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 dark:bg-gray-800"
                    ></input>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3 items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="font-medium text-gray-900 dark:text-gray-300">
                    <div>Dark mode</div>
                    <p
                      id="helper-checkbox-text-1"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Toggle between light and dark themes.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-neutral-100 hover:text-blue-500 dark:hover:text-blue-500 rounded-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-900 p-1.5 hover:bg-gray-300 dark:hover:bg-gray-700 inline-flex h-8 w-8"
                    onClick={toggleDarkMode}
                  >
                    {useDarkMode ? <SunIcon /> : <MoonIcon />}
                  </button>
                </div>
              </li>
              <li>
                <div className="flex gap-3 items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="font-medium text-gray-900 dark:text-gray-300">
                    <div>Clear all storage</div>
                    <p
                      id="helper-checkbox-text-1"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Clear all data stored locally.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-neutral-100 hover:text-blue-500 dark:hover:text-blue-500 rounded-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-900 p-1.5 hover:bg-gray-300 dark:hover:bg-gray-700 inline-flex h-8 w-8"
                    onClick={clearAllStorage}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
