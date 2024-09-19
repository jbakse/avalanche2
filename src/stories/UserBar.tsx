// todo: is importing immutable global data bad practice (probably)

import { posts } from "../../data/data";

import classNames from "classnames";
import "./tooltip.css";

import { User, getFullName, getHeadshotURL, getPosts } from "../../data/data";

interface UserBarProps {
  users: User[];
  activeLesson: string;
}

export const UserBar = ({ users = [], activeLesson = "" }: UserBarProps) => {
  // sort user by number of posts in active lesson, push admins to the end
  users.sort((a, b) => {
    const aWeekCount =
      getPosts(posts, a, activeLesson).length - (a.isAdmin ? 1000 : 0);
    const bWeekCount =
      getPosts(posts, b, activeLesson).length - (b.isAdmin ? 1000 : 0);
    return bWeekCount - aWeekCount;
  });

  return (
    <div className="flex items-center justify-center space-x-3 font-sans border-b h-20 shadow-md">
      {users.map((user) => {
        return (
          <UserBarUser key={user._id} user={user} activeLesson={activeLesson} />
        );
      })}
    </div>
  );
};

const UserBarUser = ({
  user,
  activeLesson,
}: {
  user: User;
  activeLesson: string;
}) => {
  const fullCount = getPosts(posts, user).length;
  const weekCount = getPosts(posts, user, activeLesson).length;

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
