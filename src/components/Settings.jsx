import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUseApiInsteadOfFeedUrl,
  setWaitBeforeShowView,
} from "../store/appReducer";
import CogIcon from "./CogIcon";

export default function Settings() {
  const dispatch = useDispatch();
  const useApiInsteadOfFeedUrl = useSelector(
    (state) => state.app.useApiInsteadOfFeedUrl
  );
  const waitBeforeShowView = useSelector(
    (state) => state.app.waitBeforeShowView
  );

  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState(200);

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

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white text-gray-900 hover:text-blue-500 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
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
          <div className="absolute top-0 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600">
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
                      className="w-4 h-4 accent-blue-500 dark:accent-blue-700 cursor-pointer"
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    ></input>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
