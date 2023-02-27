import React from "react";
import classNames from "classnames";

export default function Badge({ value, isInvalid = false }) {
  return (
    <span
      className={classNames(
        "flex items-center text-white text-lg font-bold mr-2 px-2.5 py-0.5 rounded h-7",
        { "bg-blue-500": !isInvalid, "bg-red-500": isInvalid }
      )}
      role="badge"
      data-testid="badge"
    >
      {value}
    </span>
  );
}
