/// run with `npm tsx data/data.ts`

export * from "./users";
export * from "./posts";
export * from "./config";

import dirtyUsers from "./2023_spring/users.json";
import dirtyPosts from "./2023_spring/posts.json";
import dirtyPrefs from "./2023_spring/prefs.json";

import { cleanUsers } from "./users";
import { cleanPosts } from "./posts";
import { cleanConfig } from "./config";

export const users = cleanUsers(dirtyUsers);
export const posts = cleanPosts(dirtyPosts, users);
export const config = cleanConfig(dirtyPrefs, posts);
