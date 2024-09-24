// todo: is importing immutable global data bad practice (probably)

import { posts } from "../../data/data";

import classNames from "classnames";
import "./tooltip.css";

import { UserData, getHeadshotURL, filterPosts } from "../../data/data";

interface UserBarProps {
  users: UserData[];
  activeLesson: string | null;
  activeUser: UserData | null;
  onUserChange?: (user: UserData | null) => void;
}

export const UserBar = ({
  users = [],
  activeLesson = "",
  activeUser,
  onUserChange,
}: UserBarProps) => {
  // sort user by number of posts in active lesson, push admins to the end
  users.sort((userA, userB) => {
    const aLessonCount =
      filterPosts(posts, userA, activeLesson).length -
      (userA.isAdmin ? 1000 : 0);
    const bLessonCount =
      filterPosts(posts, userB, activeLesson).length -
      (userB.isAdmin ? 1000 : 0);
    return bLessonCount - aLessonCount;
  });

  return (
    <div className="flex items-center justify-center space-x-3 font-sans border-b h-20 shadow-md">
      {users.map((user) => {
        return (
          <UserBarUser
            key={user._id}
            user={user}
            activeLesson={activeLesson}
            activeUser={activeUser}
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
  activeUser,
  isActive,
  onClick,
}: {
  user: UserData;
  activeLesson: string | null;
  activeUser: UserData | null;
  isActive: boolean;
  onClick: () => void;
}) => {
  const fullCount = filterPosts(posts, user).length;
  const lessonCount = filterPosts(posts, user, activeLesson).length;

  return (
    <div key={user._id} className="relative" onClick={onClick}>
      <img
        className={classNames(
          "w-14 h-14 object-cover border-b-[6px] cursor-pointer",
          {
            "border-red-600": lessonCount <= 1,
            "border-orange-300": lessonCount === 2,
            "border-yellow-300": lessonCount === 3,
            "border-green-500": lessonCount >= 4,
            "border-transparent": user.isAdmin,
          }
        )}
        src={getHeadshotURL(user.headshotId, "small")}
        alt={user.name}
      />
      {isActive && (
        <div className="absolute top-full mt-0 w-0 h-0 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
      )}

      <div className="tooltip text-center ">
        <h2 className="font-bold uppercase pb-1">{user.name}</h2>
        <p>{fullCount} sketches</p>
        {activeLesson && <p>{lessonCount} this lesson</p>}
      </div>
    </div>
  );
};
