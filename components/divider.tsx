import classNames from "classnames";
import React from "react";

export default function HorizontalDivider({
  outerClassName,
  innerClassName,
}: {
  outerClassName?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={classNames(
        "flex w-full flex-row items-center justify-center",
        outerClassName
      )}
    >
      <div
        className={classNames(
          "w-full bg-gray-800 pt-[1px] opacity-40",
          innerClassName
        )}
      ></div>
    </div>
  );
}
