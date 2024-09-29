import React from 'react';
import { UserData, Config, PostData } from '../data/data';

interface UserCalendarProps {
  user: UserData;
  config: Config;
  posts: PostData[];
  onPostChange?: (newActivePost: PostData | null) => void;
}

const getColorForPostCount = (count: number): string => {
  if (count === 0) return 'bg-gray-200';
  if (count <= 2) return 'bg-red-400';
  if (count === 3) return 'bg-orange-400';
  if (count === 4) return 'bg-yellow-400';
  return 'bg-green-400';
};

export const UserCalendar: React.FC<UserCalendarProps> = ({ user, config, posts, onPostChange }) => {
  const userPosts = posts.filter(post => post.authorId === user._id);
  const firstPostDate = new Date(Math.min(...userPosts.map(post => new Date(post.createdAt).getTime())));
  const lastPostDate = new Date(Math.max(...userPosts.map(post => new Date(post.createdAt).getTime())));

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
      post => new Date(post.createdAt).toDateString() === date.toDateString()
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
    const postsForDay = getPostsForDate(date);
    if (postsForDay.length > 0 && onPostChange) {
      onPostChange(postsForDay[0]); // Open the first post for that day
    }
  };

  return (
    <div className="flex">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col mr-1">
          {week.map((day, dayIndex) => {
            const postsForDay = getPostsForDate(day);
            const lessonName = getLessonForDate(day);
            return (
              <div
                key={dayIndex}
                className={`w-4 h-4 m-0.5 ${getColorForPostCount(postsForDay.length)} cursor-pointer`}
                title={`${day.toDateString()}: ${postsForDay.length} posts${lessonName ? ` - ${lessonName}` : ''}`}
                onClick={() => handleDayClick(day)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
