import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Podcast from "./views/Podcast";
import Episode from "./views/Episode";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/podcast/1">Podcast</Link>
        <Link to="/podcast/1/episode/1">Episode</Link>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/podcast/:podcastId" element={<Podcast />}></Route>
          <Route
            exact
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}