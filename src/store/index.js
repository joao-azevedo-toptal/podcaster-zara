import { combineReducers, configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./podcastsReducer";
import notificationsReducer from "./notificationsReducer";

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  notifications: notificationsReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });
};
