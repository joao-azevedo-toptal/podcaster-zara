import { combineReducers, configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./podcastsReducer";
import notificationsReducer from "./notificationsReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  notifications: notificationsReducer,
  app: appReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });
};
