// import React from "react";

import { Button } from "./Button";

type User = {
  name: string;
  avatarUrl: string;
  isAdmin: boolean;
};

interface HeaderProps {
  user?: User;
  title: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onPostSketch?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({
  user,
  title = "Untitled",
  onLogin,
  onLogout,
  onPostSketch,
  onCreateAccount,
}: HeaderProps) => (
  <header className="flex items-center font-sans border-b h-28">
    <h1 className="px-8 text-2xl uppercase">{title}</h1>
    <div className="ml-auto px-8 flex items-center">
      {user ? (
        <>
          <Button onClick={onPostSketch} label="Post a Sketch" />
          <img
            className={classes(
              "ml-4 rounded-full w-16 h-16",
              user.isAdmin ? "border-4 border-red-500" : ""
            )}
            src={user.avatarUrl}
          />
        </>
      ) : (
        <>
          <Button onClick={onLogin} label="Log in" />
          <Button
            // className="ml-4"
            primary
            className="ml-4"
            onClick={onCreateAccount}
            label="Sign up"
          />
        </>
      )}
    </div>
  </header>
);

function classes(...args: string[]) {
  return args.join(" ");
}
