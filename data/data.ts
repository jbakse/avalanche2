import posts from "./2023_spring/posts.json";
import users from "./2023_spring/users.json";

import { PostProps } from "../src/stories/Post";

const emojis: { [key: string]: string } = {
  funny: "😂",
  nerdy: "🤓",
  pretty: "😍",
};

function extractPostProps(input: unknown): PostProps {
  // initialize required properties
  const postProps: PostProps = {
    imageUrls: [],
    emojis: "",
    codeUrl: "",
    description: "",
    avatarUrl: "",
    author: "",
    date: new Date("2000-01-01 12:00 am"),
  };

  if (!isPlainObject(input)) return postProps;

  // imageUrls
  if (Array.isArray(input.cloudinary_media)) {
    postProps.imageUrls = input.cloudinary_media
      .map((o) => o.public_id)
      .filter(isString)
      .map(
        (public_id) =>
          `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${public_id}`
      );
  }

  // emojis
  if (Array.isArray(input.votes)) {
    postProps.emojis = input.votes
      ?.map((vote) => emojis[vote.category])
      .filter(isString)
      .join("");
  }

  // codeUrl
  if (isString(input.codeUrl)) postProps.codeUrl = input.codeUrl;

  // description
  if (isString(input.description)) postProps.description = input.description;

  // avatarUrl
  if (isString(input.author_id)) {
    const user = users.find((user) => user._id === input.author_id);
    if (user) {
      const headshot = user.profile?.headshot;
      postProps.avatarUrl = `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,g_face,h_100,q_100,w_100/v1/${headshot}`;
    }
  }

  // author
  if (isString(input.author)) postProps.author = input.author;

  // date
  if (isString(input.date)) postProps.date = new Date(input.date);

  return postProps;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function convertPost(post) {
  return {
    _id: post._id ?? 0,
    author_id: post.author_id ?? "",
    author: post.author ?? "",
    created_at: post.created_at.$date ?? "",
    posted: post.posted ?? false,
    lesson: post.lesson ?? "",
    description: post.description ?? "",
    code: post.code ?? "",
    cloudinary_media: post.cloudinary_media.map((media) => ({
      public_id: media.public_id ?? "",
      width: media.width ?? 0,
      height: media.height ?? 0,
      format: media.format ?? "",
      resource_type: media.resource_type ?? "",
    })),
    votes: post.votes.map((vote) => ({
      category: vote.category ?? "",
      voter_id: vote.voter_id ?? "",
      created_at: vote.created_at.$date ?? "",
    })),
    comments: post.comments.map((comment) => ({
      comment: comment.comment ?? "",
      commenter_id: comment.commenter_id ?? "",
      created_at: comment.created_at.$date ?? "",
    })),
  };
}

// function isStringArray(value: unknown): value is string[] {
//   return Array.isArray(value) && value.every((item) => isString(item));
// }

const data = posts.map(convertPost);
console.log(JSON.stringify(data, null, 2));
// write to out.json
import fs from "fs";
fs.writeFileSync(
  "./data/2023_spring/posts_clean.json",
  JSON.stringify(data, null, 2)
);
