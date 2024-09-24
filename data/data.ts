export type { UserData } from "./users";
export type { PostData } from "./posts";
export type { Config, Lesson } from "./config";

import dirtyUsers from "./2023_spring/users.json";
import dirtyPosts from "./2023_spring/posts.json";
import dirtyPrefs from "./2023_spring/prefs.json";

import { cleanUsers, UserData } from "./users";
import { cleanPosts, PostData } from "./posts";
import { cleanConfig } from "./config";

export const users = cleanUsers(dirtyUsers);
export const posts = cleanPosts(dirtyPosts, users);

export const config = cleanConfig(dirtyPrefs);

export function filterPosts(
  posts: PostData[],
  user?: UserData | null,
  lesson?: string | null
): PostData[] {
  // returns posts match user and lesson if provided
  return posts.filter(
    (post) =>
      (!user || post.authorId === user?._id) &&
      (!lesson || post.lessonName === lesson)
  );
}

export function getHeadshotURL(
  user: UserData,
  size: "small" | "large" = "small"
): string {
  const blackPixel =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";
  const width = size === "small" ? 64 : 500;

  return user.headshotId
    ? `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_${width}/v1/${user.headshotId}`
    : blackPixel;
}
