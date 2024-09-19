/// run with `npm tsx data/data.ts`

import posts from "./2023_spring/posts.json";
import users from "./2023_spring/users.json";
import prefs from "./2023_spring/prefs.json";

type CloudinaryID = string;

/// USERS
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  headshot: CloudinaryID;
  description: string;
  isAdmin: boolean;
};

// export type UserSummary = Omit<User, "description">;

export const cleanUsers = users.map(cleanUser);

export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getHeadshotURL(user: User): string {
  const blackPixel =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABNJREFUCB1jZGBg+A/EDEwgAgQADigBA//q6GsAAAAASUVORK5CYII%3D";
  return user.headshot
    ? `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_64/v1/${user.headshot}`
    : blackPixel;
}

export function getPosts(user: User, lesson?: string): Post[] {
  return cleanPosts.filter(
    (post) => post.author_id === user._id && (!lesson || post.lesson === lesson)
  );
}
function cleanUser(user: Record<string, any>): User {
  return {
    _id: user._id ?? "",
    firstName: user.profile.first_name ?? "",
    lastName: user.profile.last_name ?? "",
    headshot: user.profile.headshot ?? "",
    description: user.profile.description ?? "",
    isAdmin: user.roles?.__global_roles__.includes("admin") ?? false,
  };
}

/// POSTS

export type Post = {
  _id: string;
  author_id: string;
  author: string;
  author_headshot: string;
  created_at: string;
  isPosted: boolean;
  lesson: string;

  cloudinary_media: CloudinaryMedia[];
  description: string;
  code: string;

  votes: Vote[];
  comments: Comment[];
};

type CloudinaryMedia = {
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
};

type Vote = {
  content: string;
  author: string;
  created_at: string;
};

type Comment = {
  content: string;
  author: string;
  created_at: string;
};

export const cleanPosts = posts
  .sort((a, b) => {
    const dateA = new Date(a.created_at.$date);
    const dateB = new Date(b.created_at.$date);
    // reverse chronological order
    return dateB.getTime() - dateA.getTime();
  })
  .map(convertPost);

function convertPost(post: Record<string, any>): Post {
  const emojis: { [key: string]: string } = {
    funny: "😂",
    nerdy: "🤓",
    pretty: "😍",
  };

  return {
    _id: post._id ?? 0,
    author: post.author ?? "",
    author_id: post.author_id ?? "",
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

/// PREFS
export type Prefs = {
  site_title: string;
  avalanche_message: string;
  weeks: Week[];
};

export type Week = {
  lesson: string;
  sketchCount: number;
  start: string;
  end: string;
};

export const prefsClean: Prefs = {
  site_title: prefs.site_title ?? "",
  avalanche_message: prefs.avalanche_message ?? "",
  weeks: prefs.weeks.map((week: Record<string, any>) => ({
    lesson: week.topic ?? "",
    sketchCount: cleanPosts.filter((post) => post.lesson === week.topic).length,
    start: week.start.$date ?? "",
    end: week.end.$date ?? "",
  })),
};

// write to out.json
// import fs from "fs";
// fs.writeFileSync(
//   "./data/2023_spring/posts_clean.json",
//   JSON.stringify(data, null, 2)
// );
