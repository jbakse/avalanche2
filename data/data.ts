/// run with `npm tsx data/data.ts`

export * from "./users";
export * from "./posts";
export * from "./prefs";

import dirtyUsers from "./2023_spring/users.json";
import dirtyPosts from "./2023_spring/posts.json";
import dirtyPrefs from "./2023_spring/prefs.json";

import { cleanUsers } from "./users";
import { cleanPosts } from "./posts";
import { cleanPrefs } from "./prefs";

export const users = cleanUsers(dirtyUsers);
export const posts = cleanPosts(dirtyPosts, users);
export const config = cleanPrefs(dirtyPrefs, posts);

// write to out.json
// import fs from "fs";
// fs.writeFileSync(
//   "./data/2023_spring/posts_clean.json",
//   JSON.stringify(data, null, 2)
// );
