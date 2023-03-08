import React from "react";
import classNames from "classnames";

export default function SearchInput({
  value,
  onChange,
  isInvalid = false,
  placeholder = "Filter podcasts...",
}) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <label className="block w-64">
      <span className="sr-only">Search</span>
      <input
        className={classNames(
          "placeholder:italic placeholder:text-slate-400 dark:placeholder:text-neutral-100 block bg-white dark:bg-gray-700 w-full border border-slate-300 dark:border-slate-900 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm",
          {
            "focus:border-sky-500 dark:focus:border-sky-500 focus:ring-sky-500":
              !isInvalid,
            "focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500":
              isInvalid,
          }
        )}
        placeholder={placeholder}
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
        role="search"
        data-testid="search-input"
      />
    </label>
  );
}
