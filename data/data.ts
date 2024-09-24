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
export const posts = cleanPosts(dirtyPosts, users).filter(
  (post) =>
    // keep only if post's AuthorId is in users
    users.find((user) => user._id === post.authorId) &&
    // keep only posted posts
    post.isPosted
);

export const validPosts = ProcessingInstruction;

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

const blackPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";

export function getHeadshotURL(
  mediaId?: string,
  size: "small" | "large" = "small"
): string {
  const width = size === "small" ? 64 : 500;
  if (!mediaId) return blackPixel;
  return `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_${width}/v1/${mediaId}`;
}

export function getVideoThumbnailURL(mediaId: string): string {
  // example video thumb url
  // https://res.cloudinary.com/compform2023spring/video/upload/w_350/avalanche2023spring/iezbyqnfdvl9rvaoyank.jpg

  return `https://res.cloudinary.com/compform2023spring/video/upload/w_350/${mediaId}.jpg`;
}

export function getImageThumbnailURL(mediaId: string): string {
  // example image thumb url
  //https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/avalanche2023spring/v2agzd39fbrclj7urnve

  return `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${mediaId}.jpg`;
}
