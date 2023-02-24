import React from "react";
import classNames from "classnames";

export default function Badge({ value, isInvalid = false }) {
  return (
    <span
      className={classNames(
        "flex items-center bg-blue-500 text-white text-lg font-bold mr-2 px-2.5 py-0.5 rounded h-7",
        { "bg-red-500": isInvalid }
      )}
    >
      {value}
    </span>
  );
}
