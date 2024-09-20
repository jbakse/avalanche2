// todo: is importing immutable global data bad practice (probably)

import { posts } from "../../data/data";

import classNames from "classnames";
import "./tooltip.css";

import { User, getFullName, getHeadshotURL, getPosts } from "../../data/data";

interface UserBarProps {
  users: User[];
  activeLesson: string;
  activeUser: User | null;
  onUserChange?: (user: User | null) => void;
}

export const UserBar = ({
  users = [],
  activeLesson = "",
  activeUser,
  onUserChange,
}: UserBarProps) => {
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
          <UserBarUser
            key={user._id}
            user={user}
            activeLesson={activeLesson}
            isActive={activeUser?._id === user._id}
            onClick={() =>
              // if the user is inactive, activate them
              // if the user is already active, deactivate them
              onUserChange?.(activeUser?._id === user._id ? null : user)
            }
          />
        );
      })}
    </div>
  );
};

const UserBarUser = ({
  user,
  activeLesson,
  isActive,
  onClick,
}: {
  user: User;
  activeLesson: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  const fullCount = getPosts(posts, user).length;
  const weekCount = getPosts(posts, user, activeLesson).length;

  return (
    <div key={user._id} className="relative" onClick={onClick}>
      <img
        className={classNames(
          "w-14 h-14 object-cover border-b-[6px] cursor-pointer",
          {
            "border-red-600": weekCount <= 1,
            "border-orange-300": weekCount === 2,
            "border-yellow-300": weekCount === 3,
            "border-green-500": weekCount >= 4,
            "border-transparent": user.isAdmin,
          }
        )}
        src={getHeadshotURL(user)}
        alt={getFullName(user)}
      />
      {isActive && (
        <div className="absolute top-full mt-0 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
      )}

      <div className="tooltip text-center ">
        <h2 className="font-bold uppercase pb-1">{getFullName(user)}</h2>
        <p>{fullCount} sketches</p>
        <p>{weekCount} this week</p>
      </div>
    </div>
  );
};
