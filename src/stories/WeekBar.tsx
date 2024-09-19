import "./tooltip.css";

import { Week } from "../../data/data";

interface WeekBarProps {
  activeLesson: string;
  weeks: Week[];
}
// justify-between
export const WeekBar = ({ weeks = [], activeLesson = "" }: WeekBarProps) => (
  <div className="flex items-center justify-center space-x-2 font-sans py-4 ">
    {weeks.map((week, i) => (
      <div
        key={week.lesson}
        className="flex flex-col justify-between h-16 w-20 text-center py-1 hover:bg-gray-200 rounded cursor-pointer relative"
      >
        <p className="text-[10px] uppercase mb-1 font-light">{week.lesson}</p>
        <p className="text-lg font-regular">{week.sketchCount}</p>
        {week.lesson === activeLesson && (
          <div className="absolute top-full mt-2 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
        )}
      </div>
    ))}
  </div>
);
