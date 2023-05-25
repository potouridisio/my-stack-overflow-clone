/* eslint-disable react/prop-types */
import { useId, useState } from "react";

export default function TextField({
  autoFocus,
  error = false,
  helperText,
  label,
  multiline,
  name,
  placeholder,
  rows,
}) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative inline-flex min-w-0 flex-col border-0 p-0 align-top">
      <label
        className={`pointer-events-none absolute left-0 top-0 z-[1] block ${
          isFocused || value !== ""
            ? "max-w-[calc(133%_-_32px)]"
            : "max-w-[calc(100%_-_24px)]"
        } origin-[left_top] translate-x-3.5 ${
          isFocused || value !== ""
            ? "-translate-y-[9px] scale-75"
            : "translate-y-[9px] scale-100"
        } truncate p-0 leading-[1.4375em] tracking-[0.00938em] ${
          error
            ? "text-[rgb(211,_47,_47)]"
            : isFocused
            ? "text-[rgb(25,_118,_210)]"
            : "text-black text-opacity-60"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={`relative box-border inline-flex cursor-text items-center rounded${
          multiline ? " px-3.5 py-[8.5px]" : ""
        } leading-[1.4375em] tracking-[0.00938em] text-black text-opacity-[0.87]`}
      >
        {multiline ? (
          <textarea
            aria-describedby={`${id}-helper-text`}
            aria-invalid={error}
            autoFocus={autoFocus}
            className="m-0 box-content block w-full min-w-0 resize-none border-0 p-0 tracking-[inherit] text-current [background:none] [font:inherit] focus:outline-0"
            id={id}
            name={name}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setIsFocused(true)}
            rows={rows}
            value={value}
          />
        ) : (
          <input
            aria-describedby={`${id}-helper-text`}
            aria-invalid={error}
            autoFocus={autoFocus}
            className={`m-0 box-content block h-[1.4375em] w-full min-w-0 border-0 px-3.5 py-[8.5px] tracking-[inherit] text-current [background:none] [font:inherit] placeholder:!block placeholder:text-current ${
              isFocused
                ? "placeholder:opacity-[0.42]"
                : "placeholder:!opacity-0"
            } focus:outline-0`}
            id={id}
            name={name}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            type="text"
            value={value}
          />
        )}
        <fieldset
          aria-hidden={true}
          className={`pointer-events-none absolute inset-[-5px_0px_0px] m-0 min-w-[0%] overflow-hidden rounded-[inherit] ${
            isFocused ? "border-2" : "border"
          } border-solid ${
            error
              ? "border-[rgb(211,_47,_47)]"
              : isFocused
              ? "border-[rgb(25,_118,_210)]"
              : "border-black border-opacity-[0.23]"
          } px-2 text-left`}
        >
          <legend
            className={`invisible block h-[11px] w-auto ${
              isFocused || value !== "" ? "max-w-full" : "max-w-[0.01px]"
            } overflow-hidden whitespace-nowrap p-0 text-[0.75em] [float:unset]`}
          >
            <span className="visible inline-block px-[5px] opacity-0">
              {label}
            </span>
          </legend>
        </fieldset>
      </div>
      <p
        className={`mx-3.5 mt-[3px] text-left text-xs leading-[1.66] tracking-[0.03333em] ${
          error ? "text-[rgb(211,_47,_47)]" : "text-black text-opacity-60"
        }`}
        id={`${id}-helper-text`}
      >
        {helperText}
      </p>
    </div>
  );
}
