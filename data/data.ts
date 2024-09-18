/// run with `npm tsx data/data.ts`

import posts from "./2023_spring/posts.json";
import users from "./2023_spring/users.json";

type CloudinaryID = string;
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  headshot: CloudinaryID;
  description: string;
};

export type UserSummary = Omit<User, "description">;

export const cleanUsers = users.map(cleanUser);

export function getFullName(user: UserSummary): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getHeadshotURL(user: UserSummary): string {
  const blackPixel =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";
  return user.headshot
    ? `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_64/v1/${user.headshot}`
    : blackPixel;
}
function cleanUser(user: Record<string, any>): User {
  return {
    _id: user._id ?? "",
    firstName: user.profile.first_name ?? "",
    lastName: user.profile.last_name ?? "",
    headshot: user.profile.headshot ?? "",
    description: user.profile.description ?? "",
  };
}

// write to out.json
// import fs from "fs";
// fs.writeFileSync(
//   "./data/2023_spring/posts_clean.json",
//   JSON.stringify(data, null, 2)
// );

import { PostProps, CloudinaryMedia, Vote, Comment } from "../src/stories/Post";
export const cleanPosts = posts
  .sort((a, b) => {
    const dateA = new Date(a.created_at.$date);
    const dateB = new Date(b.created_at.$date);
    // reverse chronological order
    return dateB.getTime() - dateA.getTime();
  })
  .map(convertPost);

function convertPost(post: Record<string, any>): PostProps | null {
  const emojis: { [key: string]: string } = {
    funny: "😂",
    nerdy: "🤓",
    pretty: "😍",
  };

  return {
    _id: post._id ?? 0,
    author: post.author ?? "",
    author_headshot:
      users.find((user) => user._id === post.author_id)?.profile.headshot ?? "",
    created_at: post.created_at.$date ?? "",
    isPosted: post.posted ?? false,
    lesson: post.lesson ?? "",
    description: post.description ?? "",
    code: post.code ?? "",
    cloudinary_media: post.cloudinary_media
      .map(
        (media: Record<string, any>) =>
          ({
            public_id: media.public_id ?? "",
            width: media.width ?? 0,
            height: media.height ?? 0,
            format: media.format ?? "",
            resource_type: media.resource_type ?? "",
          } as CloudinaryMedia)
      )
      .filter((media: Record<string, any>) => media.public_id),

    votes: post.votes.map(function convertVote(
      vote: Record<string, any>
    ): Vote {
      const profile = users.find(
        (user) => user._id === vote.author_id
      )?.profile;

      const authorName = profile
        ? `${profile.first_name} ${profile.last_name}`
        : "";

      return {
        content: emojis[vote.category] ?? "",
        author: authorName,
        created_at: vote.created_at.$date ?? "",
      };
    }),

    comments: post.comments.map(function convertComment(
      vote: Record<string, any>
    ): Comment {
      const profile = users.find(
        (user) => user._id === vote.author_id
      )?.profile;

      const authorName = profile
        ? `${profile.first_name} ${profile.last_name}`
        : "";
      return {
        content: emojis[vote.category] ?? "",
        author: authorName,
        created_at: vote.created_at.$date ?? "",
      };
    }),
  };
}

// function extractPostProps(input: unknown): PostProps {
//   // initialize required properties
//   const postProps: PostProps = {
//     imageUrls: [],
//     emojis: "",
//     codeUrl: "",
//     description: "",
//     avatarUrl: "",
//     author: "",
//     date: new Date("2000-01-01 12:00 am"),
//   };

//   if (!isPlainObject(input)) return postProps;

//   // imageUrls
//   if (Array.isArray(input.cloudinary_media)) {
//     postProps.imageUrls = input.cloudinary_media
//       .map((o) => o.public_id)
//       .filter(isString)
//       .map(
//         (public_id) =>
//           `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${public_id}`
//       );
//   }

//   // emojis
//   if (Array.isArray(input.votes)) {
//     postProps.emojis = input.votes
//       ?.map((vote) => emojis[vote.category])
//       .filter(isString)
//       .join("");
//   }

//   // codeUrl
//   if (isString(input.codeUrl)) postProps.codeUrl = input.codeUrl;

//   // description
//   if (isString(input.description)) postProps.description = input.description;

//   // avatarUrl
//   if (isString(input.author_id)) {
//     const user = users.find((user) => user._id === input.author_id);
//     if (user) {
//       const headshot = user.profile?.headshot;
//       postProps.avatarUrl = `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,g_face,h_100,q_100,w_100/v1/${headshot}`;
//     }
//   }

//   // author
//   if (isString(input.author)) postProps.author = input.author;

//   // date
//   if (isString(input.date)) postProps.date = new Date(input.date);

//   return postProps;
// }

// function isString(value: unknown): value is string {
//   return typeof value === "string";
// }

// function isPlainObject(value: unknown): value is Record<string, unknown> {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }
