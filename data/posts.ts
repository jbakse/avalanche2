import { User } from "./users";

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

export function getPosts(posts: Post[], user?: User, lesson?: string): Post[] {
  // returns posts match user and lesson if provided
  return posts.filter(
    (post) =>
      (!user || post.author_id === user?._id) &&
      (!lesson || post.lesson === lesson)
  );
  // return posts.filter(
  //   (post) => post.author_id === user._id && (!lesson || post.lesson === lesson)
  // );
}

export function cleanPosts(
  posts: Record<string, any>[],
  users: User[]
): Post[] {
  return posts
    .sort((a, b) => {
      const dateA = new Date(a.created_at.$date);
      const dateB = new Date(b.created_at.$date);
      // reverse chronological order
      return dateB.getTime() - dateA.getTime();
    })
    .map((post) => convertPost(post, users));
}

// export const cleanPosts = posts
//   .sort((a, b) => {
//     const dateA = new Date(a.created_at.$date);
//     const dateB = new Date(b.created_at.$date);
//     // reverse chronological order
//     return dateB.getTime() - dateA.getTime();
//   })
//   .map(convertPost);

function convertPost(post: Record<string, any>, users: User[]): Post {
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
      users.find((user) => user._id === post.author_id)?.headshot ?? "",
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
      const user = users.find((user) => user._id === vote.author_id);
      const authorName = user ? `${user.firstName} ${user.lastName}` : "";

      return {
        content: emojis[vote.category] ?? "",
        author: authorName,
        created_at: vote.created_at.$date ?? "",
      };
    }),

    comments: post.comments.map(function convertComment(
      vote: Record<string, any>
    ): Comment {
      const user = users.find((user) => user._id === vote.author_id);
      const authorName = user ? `${user.firstName} ${user.lastName}` : "";

      return {
        content: emojis[vote.category] ?? "",
        author: authorName,
        created_at: vote.created_at.$date ?? "",
      };
    }),
  };
}
