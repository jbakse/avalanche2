// import React from "react";

import "./userBar.css";

type User = {
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
  <div className="flex items-center justify-center space-x-2 font-sans border-b h-20 shadow-md">
    {users.map((user, i) => (
      <div key={user.name} className="relative">
        <img className="w-12 h-12" src={user.avatarUrl} alt={user.name} />
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
