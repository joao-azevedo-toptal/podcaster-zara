import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Header from "./components/Header";

import Home from "./views/Home";
import Podcast from "./views/Podcast";
import EpisodeList from "./views/EpisodeList";
import Episode from "./views/Episode";

import NotificationsManager from "./components/NotificationsManager";
import DelayedView from "./views/DelayedView";

export default function App() {
  const useDarkMode = useSelector((state) => state.app.useDarkMode);

  return (
    <div className={classNames("min-h-screen", { dark: useDarkMode })}>
      <div className="min-h-screen dark:bg-gray-800">
        <Header />
        <NotificationsManager />
        <div className="md:container md:mx-auto px-3 pt-6 pb-16">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <DelayedView>
                  <Home />
                </DelayedView>
              }
            ></Route>
            <Route
              exact
              path="/podcast/:podcastId/*"
              element={
                <DelayedView>
                  <Podcast />
                </DelayedView>
              }
            >
              <Route
                exact
                path="/podcast/:podcastId/*"
                element={<EpisodeList />}
              ></Route>
              <Route
                exact
                path="/podcast/:podcastId/*/episode/:episodeId"
                element={<Episode />}
              ></Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
