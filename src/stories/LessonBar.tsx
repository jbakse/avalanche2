import "./tooltip.css";

import { posts, filterPosts } from "../data/data";
import { UserData } from "../data/data";
import { Lesson } from "../data/data";

interface LessonBarProps {
  activeLesson: string | null;
  activeUser: UserData | null;
  lessons: Lesson[];
  onLessonChange?: (lesson: string | null) => void;
}

export const LessonBar = ({
  lessons: lessons,
  activeLesson,
  activeUser,
  onLessonChange,
}: LessonBarProps) => (
  <div className="flex items-center justify-center space-x-2 py-4 font-sans">
    {lessons.map((lesson) => (
      <div
        key={lesson.name}
        className="relative flex h-16 w-20 cursor-pointer flex-col justify-between rounded py-1 text-center hover:bg-gray-200"
        onClick={() =>
          onLessonChange?.(lesson.name === activeLesson ? null : lesson.name)
        }
      >
        <p className="mb-1 text-[10px] font-light uppercase">{lesson.name}</p>
        <p className="font-regular text-lg">
          {activeUser
            ? filterPosts(posts, activeUser, lesson.name).length
            : filterPosts(posts, null, lesson.name).length}
        </p>
        {lesson.name === activeLesson && (
          <div className="absolute left-1/2 top-full mt-2 h-0 w-0 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
        )}
      </div>
    ))}
  </div>
);
