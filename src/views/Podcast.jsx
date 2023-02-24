import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { selectPodcastById } from "../store/podcastsReducer";

export default function Podcast() {
  const { podcastId } = useParams();
  const podcast = useSelector((state) => selectPodcastById(state, podcastId));

  return (
    <div className="grid grid-cols-5 gap-14">
      <div className="card">
        <img className="rounded mx-auto" src={podcast?.["im:image"][2].label} />
        <hr className="my-5" />
        <div className="font-bold">{podcast?.["im:name"].label}</div>
        <div className="italic text-sm text-neutral-700">
          by {podcast?.["im:artist"].label}
        </div>
        <hr className="my-5" />
        <div className="font-bold text-sm">Description:</div>
        <div className="italic text-sm text-neutral-700">
          {podcast?.["summary"].label}
        </div>
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  );
}
