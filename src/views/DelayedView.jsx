import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsLoading } from "../store/appReducer";

export default function DelayedView({ children }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(false);

  const waitBeforeShowView = useSelector(
    (state) => state.app.waitBeforeShowView
  );

  useEffect(() => {
    if (previousPathname !== pathname) {
      setPreviousPathname(pathname);
      setIsShown(false);
      dispatch(setIsLoading(true));
    }
    const timer = setTimeout(() => {
      setIsShown(true);
      dispatch(setIsLoading(false));
    }, waitBeforeShowView);
    return () => clearTimeout(timer);
  }, [pathname]);

  return isShown ? children : null;
}
