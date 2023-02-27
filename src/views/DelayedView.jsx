import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsLoading } from "../store/appReducer";

export default function DelayedView({ children, waitBeforeShow = 200 }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(false);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setPreviousPathname(pathname);
      setIsShown(false);
      dispatch(setIsLoading(true));
    }
    const timer = setTimeout(() => {
      setIsShown(true);
      dispatch(setIsLoading(false));
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow, pathname]);

  return isShown ? children : null;
}
