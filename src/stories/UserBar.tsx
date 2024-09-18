import classNames from "classnames";
import "./tooltip.css";

import { UserSummary, getFullName, getHeadshotURL } from "../../data/data";
interface UserBarProps {
  users: UserBarUser[];
}

interface UserBarUser extends UserSummary {
  weekSketches: number;
  totalSketches: number;
}

export const UserBar = ({ users = [] }: UserBarProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 font-sans border-b h-20 shadow-md">
      {users.map((user, i) => (
        <div key={user._id} className="relative">
          <img
            className={classNames("w-14 h-14 object-cover", {
              "border-b-4 border-red-600": user.weekSketches <= 1,
              "border-b-4 border-orange-300": user.weekSketches === 2,
              "border-b-4 border-yellow-300": user.weekSketches === 3,
              "border-b-4 border-green-500": user.weekSketches >= 4,
            })}
            src={getHeadshotURL(user)}
            alt={getFullName(user)}
          />
          <div className="tooltip text-center ">
            <h2 className="font-bold uppercase pb-1">{getFullName(user)}</h2>
            <p>{user.totalSketches} sketches</p>
            <p>{user.weekSketches} this week</p>
          </div>
        </div>
      ))}
    </div>
  );
};
