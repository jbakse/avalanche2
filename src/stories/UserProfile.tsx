import { marked } from "marked";

import { UserData, getHeadshotURL } from "../../data/data";

interface UserProfileProps {
  user: UserData;
}

export const UserProfile = ({ user }: UserProfileProps) => {
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
    </div>
  );
};
