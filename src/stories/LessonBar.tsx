import "./tooltip.css";

import { posts, filterPosts } from "../../data/data";
import { User } from "../../data/data";
import { Lesson } from "../../data/data";

interface LessonBarProps {
  activeLesson: string | null;
  activeUser: User | null;
  lessons: Lesson[];
  onLessonChange?: (lesson: string | null) => void;
}

export const LessonBar = ({
  lessons: lessons,
  activeLesson,
  activeUser,
  onLessonChange,
}: LessonBarProps) => (
  <div className="flex items-center justify-center space-x-2 font-sans py-4 ">
    {lessons.map((lesson) => (
      <div
        key={lesson.lesson}
        className="flex flex-col justify-between h-16 w-20 text-center py-1 hover:bg-gray-200 rounded cursor-pointer relative"
        onClick={() =>
          onLessonChange?.(
            lesson.lesson === activeLesson ? null : lesson.lesson
          )
        }
      >
        <p className="text-[10px] uppercase mb-1 font-light">{lesson.lesson}</p>
        <p className="text-lg font-regular">
          {activeUser
            ? filterPosts(posts, activeUser, lesson.lesson).length
            : filterPosts(posts, null, lesson.lesson).length}
        </p>
        {lesson.lesson === activeLesson && (
          <div className="absolute top-full mt-2 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
        )}
      </div>
    ))}
  </div>
);
