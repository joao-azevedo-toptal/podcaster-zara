import { configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./podcastsReducer";
import notificationsReducer from "./notificationsReducer";

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    notifications: notificationsReducer,
  },
  devTools: true,
});
