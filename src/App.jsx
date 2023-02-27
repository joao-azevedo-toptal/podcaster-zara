import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import Podcast from "./views/Podcast";
import EpisodeList from "./views/EpisodeList";
import Episode from "./views/Episode";

import NotificationsManager from "./components/NotificationsManager";

export default function App() {
  return (
    <>
      <Header />
      <NotificationsManager />
      <div className="md:container md:mx-auto px-3 pt-6 pb-16">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/podcast/:podcastId/*" element={<Podcast />}>
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
    </>
  );
}
