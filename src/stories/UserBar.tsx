// todo: is importing immutable global data bad practice (probably)

import { posts } from "../../data/data";

import classNames from "classnames";
import "./tooltip.css";

import { User, getFullName, getHeadshotURL, getPosts } from "../../data/data";

interface UserBarProps {
  users: User[];
}

export const UserBar = ({ users = [] }: UserBarProps) => {
  // sort user by weekPosts
  users.sort((a, b) => {
    const aWeekCount = getPosts(posts, a, "Random").length;
    const bWeekCount = getPosts(posts, b, "Random").length;
    return bWeekCount - aWeekCount;
  });

  return (
    <div className="flex items-center justify-center space-x-3 font-sans border-b h-20 shadow-md">
      {users.map((user) => {
        return <UserBarUser key={user._id} user={user} />;
      })}
    </div>
  );
};

const UserBarUser = ({ user }: { user: User }) => {
  const fullCount = getPosts(posts, user).length;
  const weekCount = getPosts(posts, user, "Random").length;

  return (
    <div key={user._id} className="relative">
      <img
        className={classNames("w-14 h-14 object-cover border-b-[6px]", {
          "border-red-600": weekCount <= 1,
          "border-orange-300": weekCount === 2,
          "border-yellow-300": weekCount === 3,
          "border-green-500": weekCount >= 4,
          "border-transparent": user.isAdmin,
        })}
        src={getHeadshotURL(user)}
        alt={getFullName(user)}
      />
      <div className="tooltip text-center ">
        <h2 className="font-bold uppercase pb-1">{getFullName(user)}</h2>
        <p>{fullCount} sketches</p>
        <p>{weekCount} this week</p>
      </div>
    </div>
  );
};
