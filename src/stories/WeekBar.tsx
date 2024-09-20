import "./tooltip.css";

import { posts, filterPosts } from "../../data/data";
import { User } from "../../data/data";
import { Week } from "../../data/data";

interface WeekBarProps {
  activeLesson: string | null;
  activeUser: User | null;
  weeks: Week[];
  onLessonChange?: (lesson: string | null) => void;
}

export const WeekBar = ({
  weeks,
  activeLesson,
  activeUser,
  onLessonChange,
}: WeekBarProps) => (
  <div className="flex items-center justify-center space-x-2 font-sans py-4 ">
    {weeks.map((week) => (
      <div
        key={week.lesson}
        className="flex flex-col justify-between h-16 w-20 text-center py-1 hover:bg-gray-200 rounded cursor-pointer relative"
        onClick={() =>
          onLessonChange?.(week.lesson === activeLesson ? null : week.lesson)
        }
      >
        <p className="text-[10px] uppercase mb-1 font-light">{week.lesson}</p>
        <p className="text-lg font-regular">
          {activeUser
            ? filterPosts(posts, activeUser, week.lesson).length
            : week.sketchCount}
        </p>
        {week.lesson === activeLesson && (
          <div className="absolute top-full mt-2 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
        )}
      </div>
    ))}
  </div>
);
