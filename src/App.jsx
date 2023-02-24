import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import Podcast from "./views/Podcast";
import Episode from "./views/Episode";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="md:container md:mx-auto px-3 py-6">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/podcast/:podcastId" element={<Podcast />}></Route>
          <Route
            exact
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
