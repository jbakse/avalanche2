// import React from "react";

import "./userBar.css";

export type Week = {
  name: string;
  sketchCount: number;
  isActive: boolean;
};

interface WeekBarProps {
  weeks: Week[];
}

export const WeekBar = ({ weeks = [] }: WeekBarProps) => (
  <div className="flex items-center justify-center space-x-2 font-sans py-4 ">
    {weeks.map((week, i) => (
      <div
        key={week.name}
        className="text-center py-1 px-4 hover:bg-gray-200 rounded cursor-pointer relative"
      >
        <p className="text-[11px] uppercase mb-1 font-light">{week.name}</p>
        <p className="text-lg font-regular">{week.sketchCount}</p>
        {week.isActive && (
          <div className="absolute mt-2 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
        )}
      </div>
    ))}
  </div>
);

function classes(...args: string[]) {
  return args.join(" ");
}
