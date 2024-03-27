// import React from "react";

import "./userBar.css";

export type User = {
  name: string;
  avatarUrl: string;
  isAdmin: boolean;
  weekSketches: number;
  totalSketches: number;
};

interface UserBarProps {
  users: User[];
}

export const UserBar = ({ users = [] }: UserBarProps) => (
  <div className="flex items-center justify-center space-x-3 font-sans border-b h-20 shadow-md">
    {users.map((user, i) => (
      <div key={user.name} className="relative">
        <img
          className={classes(
            "w-14 h-14",
            user.weekSketches === 0 ? "border-b-4 border-red-600" : "",
            user.weekSketches === 1 ? "border-b-4 border-red-600" : "",
            user.weekSketches === 2 ? "border-b-4 border-orange-300" : "",
            user.weekSketches === 3 ? "border-b-4 border-yellow-300" : "",
            user.weekSketches === 4 ? "border-b-4 border-green-500" : ""
          )}
          src={user.avatarUrl}
          alt={user.name}
        />
        <div className="tooltip text-center ">
          <h2 className="font-bold uppercase pb-1">{user.name}</h2>
          <p>{user.totalSketches} sketches</p>
          <p>{user.weekSketches} this week</p>
        </div>
      </div>
    ))}
  </div>
);

function classes(...args: string[]) {
  return args.join(" ");
}
