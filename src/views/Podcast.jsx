import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { selectPodcastById } from "../store/podcastsReducer";

export default function Podcast() {
  const { podcastId } = useParams();
  const podcast = useSelector((state) => selectPodcastById(state, podcastId));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-14">
      <div className="col-span-1 lg:col-span-2">
        <div className="card max-w-xs mx-auto lg:max-w-none lg:mx-0">
          <img className="rounded mx-auto" src={podcast?.image} />
          <hr className="my-5" />
          <div className="font-bold">{podcast?.name}</div>
          <div className="italic text-sm text-neutral-700">
            by {podcast?.artist}
          </div>
          <hr className="my-5" />
          <div className="font-bold text-sm">Description:</div>
          <div className="italic text-sm text-neutral-700">
            {podcast?.summary}
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4 xl:col-span-6">
        <Outlet />
      </div>
    </div>
  );
}
