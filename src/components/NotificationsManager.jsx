import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeErrorMessages } from "../store/notificationsReducer";
import { clearHasError } from "../store/podcastsReducer";
import Notification from "./Notification";

export default function NotificationsManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasError = useSelector((state) => state.podcasts.hasError);

  useEffect(() => {
    if (hasError) {
      dispatch(clearHasError());
      // Go to homepage when ther is an error
      navigate("/");
    }
  }, [hasError]);

  const errorMessages = useSelector(
    (state) => state.notifications.errorMessages
  );

  const dismissErrorMessage = (index) => {
    dispatch(removeErrorMessages(index));
  };

  return (
    <div className="fixed right-10 top-20 max-w-xs w-full z-50">
      {errorMessages.map((message, index) => (
        <Notification
          message={message}
          onClose={() => dismissErrorMessage(index)}
          key={index}
        />
      ))}
    </div>
  );
}
