import React from "react";
import { UserData, PostData, config, posts } from "../data/data";
import "./tooltip.css";

interface UserCalendarProps {
  user: UserData;
  onLessonChange?: (newActiveLesson: string | null) => void;
}

const getColorForPostCount = (count: number): string => {
  if (count === 0) return "bg-gray-200";
  if (count === 1) return "bg-green-600";
  if (count === 2) return "bg-yellow-500";
  if (count === 3) return "bg-amber-600";
  if (count > 4) return "bg-red-600";
  return "bg-gray-200";
};

export const UserCalendar: React.FC<UserCalendarProps> = ({
  user,
  onLessonChange,
}) => {
  const userPosts = posts.filter((post) => post.authorId === user._id);
  const firstPostDate = new Date(
    Math.min(...userPosts.map((post) => new Date(post.createdAt).getTime())),
  );
  const lastPostDate = new Date(
    Math.max(...userPosts.map((post) => new Date(post.createdAt).getTime())),
  );

  const weeks: Date[][] = [];
  let currentDate = new Date(firstPostDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start from the beginning of the week

  while (currentDate <= lastPostDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  const getPostsForDate = (date: Date): PostData[] => {
    return userPosts.filter(
      (post) => new Date(post.createdAt).toDateString() === date.toDateString(),
    );
  };

  const getLessonForDate = (date: Date): string | null => {
    for (const lesson of config.lessons) {
      const lessonStart = new Date(lesson.start);
      const lessonEnd = new Date(lesson.end);
      if (date >= lessonStart && date <= lessonEnd) {
        return lesson.name;
      }
    }
    return null;
  };

  const handleDayClick = (date: Date) => {
    const lessonName = getLessonForDate(date);
    if (lessonName && onLessonChange) {
      onLessonChange(lessonName);
    }
  };

  return (
    <div className="flex">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="mr-1 flex flex-col">
          {week.map((day, dayIndex) => {
            const postsForDay = getPostsForDate(day);
            const lessonName = getLessonForDate(day);
            return (
              <div
                key={dayIndex}
                className={`relative m-0.5 h-4 w-4 rounded-sm ${getColorForPostCount(postsForDay.length)} cursor-pointer`}
                onClick={() => handleDayClick(day)}
              >
                <div className="tooltip">
                  {lessonName ? `${lessonName} — ` : ""}
                  {postsForDay.length} sketch
                  {postsForDay.length !== 1 ? "es" : ""}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
