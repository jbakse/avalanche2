import { marked } from "marked";

import { UserData, getHeadshotURL } from "../data/data";
import { UserCalendar } from "./UserCalendar";

interface UserProfileProps {
  user: UserData;
  onLessonChange?: (newActiveLesson: string | null) => void;
}

export const UserProfile = ({ user, onLessonChange }: UserProfileProps) => {
  return (
    <div className="my-8 flex flex-col items-center">
      {/* headshot */}
      <img
        src={getHeadshotURL(user.headshotId, "large")}
        alt={user.name}
        className="h-64 w-64 rounded-full object-cover"
      />

      {/* name */}
      <h2 className="mt-4 text-4xl font-bold">{user.name}</h2>

      {/* description */}
      <p
        className="user-content mt-2 max-w-md text-center text-xl font-light"
        dangerouslySetInnerHTML={{
          __html: marked.parse(user.description, { async: false }),
        }}
      ></p>

      {/* UserCalendar */}
      <div className="mt-8">
        <UserCalendar user={user} onLessonChange={onLessonChange} />
      </div>
    </div>
  );
};
