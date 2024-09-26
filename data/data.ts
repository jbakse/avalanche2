const dataDir = "compform2018_export";

export type { UserData } from "./users";
export type { PostData } from "./posts";
export type { Config, Lesson } from "./config";

const { cloudName } = await import(`./${dataDir}/settings.json`);

const { default: dirtyUsers } = await import(`./${dataDir}/users.json`);
const { default: dirtyPosts } = await import(`./${dataDir}/posts.json`);
const { default: dirtyPrefs } = await import(`./${dataDir}/prefs.json`);

import { cleanUsers, UserData } from "./users";
import { cleanPosts, PostData } from "./posts";
import { cleanConfig } from "./config";

export const users = cleanUsers(dirtyUsers);
export const posts = cleanPosts(dirtyPosts, users).filter(
  (post) =>
    // keep only if post's AuthorId is in users
    users.find((user) => user._id === post.authorId) &&
    // keep only posted posts
    post.isPosted,
);

export const validPosts = ProcessingInstruction;

export const config = cleanConfig(dirtyPrefs);

export function filterPosts(
  posts: PostData[],
  user?: UserData | null,
  lesson?: string | null,
): PostData[] {
  // returns posts match user and lesson if provided
  return posts.filter(
    (post) =>
      (!user || post.authorId === user?._id) &&
      (!lesson || post.lessonName === lesson),
  );
}

const blackPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";

export function getHeadshotURL(
  mediaId?: string,
  size: "small" | "large" = "small",
): string {
  const width = size === "small" ? 64 : 500;
  if (!mediaId) return blackPixel;
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,f_auto,q_auto:best,w_${width}/v1/${mediaId}`;
}

export function getAudioThumbnailURL(mediaId: string): string {
  // example audio thumb url

  return `https://res.cloudinary.com/${cloudName}/video/upload/w_350/fl_waveform/${mediaId}.jpg`;
}

export function getVideoThumbnailURL(mediaId: string): string {
  // example video thumb url
  // https://res.cloudinary.com/compform2023spring/video/upload/w_350/avalanche2023spring/iezbyqnfdvl9rvaoyank.jpg

  return `https://res.cloudinary.com/${cloudName}/video/upload/w_350/${mediaId}.jpg`;
}

export function getImageThumbnailURL(mediaId: string): string {
  // example image thumb url
  //https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/avalanche2023spring/v2agzd39fbrclj7urnve

  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${mediaId}.jpg`;
}

export function getAudioURL(mediaId: string): string {
  // https://res.cloudinary.com/compform2018/video/upload/avalanche2018/qeun1wifpgg1jsakv3en.mp3

  return `https://res.cloudinary.com/${cloudName}/video/upload/${mediaId}.mp3`;
}
export function getImageURL(mediaId: string): string {
  // example image url
  // https://res.cloudinary.com/compform2023spring/image/upload/v1/avalanche2023spring/bucqa1cmudkjuped28sn

  return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${mediaId}`;
}

export function getVideoURL(mediaId: string): string {
  // example video url
  // https://res.cloudinary.com/compform2023spring/video/upload/vc_h264/avalanche2023spring/cxtjiemeovgo26vix9cj.mp4
  return `https://res.cloudinary.com/${cloudName}/video/upload/vc_h264/${mediaId}.mp4`;
}

export function slugToUser(slug?: string): UserData | null {
  if (!slug) return null;
  if (slug === "all") return null;
  // replace - with space
  const name = slug.replace(/-/g, " ");
  return users.find((user) => user.name === name) || null;
}

export function slugToLesson(slug?: string): string | null {
  if (!slug) return null;
  if (slug === "all") return null;

  // replace - with space
  return slug.replace(/-/g, " ");
}

export function slugForUser(user?: UserData | null): string {
  if (!user) return "all";
  return user.name.replace(/ /g, "-");
}

export function slugForLesson(lesson?: string | null): string {
  if (!lesson) return "all";
  return lesson.replace(/ /g, "-");
}
