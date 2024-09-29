import { marked } from "marked";

import { UserData, getHeadshotURL, config, posts, PostData } from "../data/data";
import { UserCalendar } from "./UserCalendar";

interface UserProfileProps {
  user: UserData;
  onPostChange?: (newActivePost: PostData | null) => void;
}

export const UserProfile = ({ user, onPostChange }: UserProfileProps) => {
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
        <h3 className="mb-2 text-xl font-semibold">Posting Activity</h3>
        <UserCalendar user={user} config={config} posts={posts} onPostChange={onPostChange} />
      </div>
    </div>
  );
};
