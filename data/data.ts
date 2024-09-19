/// run with `npm tsx data/data.ts`

import posts from "./2023_spring/posts.json";
import users from "./2023_spring/users.json";
import prefs from "./2023_spring/prefs.json";

export * from "./users";
export * from "./posts";
export * from "./prefs";

import { cleanUsers as _cleanUsers } from "./users";
import { cleanPosts as _cleanPosts } from "./posts";
import { cleanPrefs as _cleanPrefs } from "./prefs";

export const cleanUsers = _cleanUsers(users);
export const cleanPosts = _cleanPosts(posts, cleanUsers);
export const cleanPrefs = _cleanPrefs(prefs, cleanPosts);

/// USERS

/// POSTS

/// PREFS

// write to out.json
// import fs from "fs";
// fs.writeFileSync(
//   "./data/2023_spring/posts_clean.json",
//   JSON.stringify(data, null, 2)
// );
