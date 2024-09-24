import { UserData } from "./users";

export type PostData = {
  _id: string;
  authorId: string;
  authorName: string;
  authorHeadshotId: string;
  createdAt: string;
  isPosted: boolean;
  lessonName: string;
  description: string;
  code: string;

  cloudinaryMedia: CloudinaryMedia[];
  votes: Vote[];
  comments: Comment[];
};

type CloudinaryMedia = {
  publicId: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
};

type Vote = {
  authorId: string;
  authorName: string;
  createdAt: string;
  content: string;
};

type Comment = {
  authorId: string;
  authorName: string;
  createdAt: string;
  content: string;
};

export function cleanPosts(
  posts: Record<string, any>[],
  users: UserData[]
): PostData[] {
  return posts
    .sort((a, b) => {
      const dateA = new Date(a.created_at.$date);
      const dateB = new Date(b.created_at.$date);
      // reverse chronological order
      return dateB.getTime() - dateA.getTime();
    })
    .filter((post) => post.posted)
    .map((post) => convertPost(post, users));
}

function convertPost(post: Record<string, any>, users: UserData[]): PostData {
  const emojis: { [key: string]: string } = {
    funny: "😂",
    nerdy: "🤓",
    pretty: "😍",
  };

  return {
    _id: post._id ?? 0,
    authorName: post.author ?? "",
    authorId: post.author_id ?? "",
    authorHeadshotId:
      users.find((user) => user._id === post.author_id)?.headshotId ?? "",
    createdAt: post.created_at.$date ?? "",
    isPosted: post.posted ?? false,
    lessonName: post.lesson ?? "",
    description: post.description ?? "",
    code: post.code ?? "",
    cloudinaryMedia: post.cloudinary_media
      .map(
        (media: Record<string, any>) =>
          ({
            publicId: media.public_id ?? "",
            width: media.width ?? 0,
            height: media.height ?? 0,
            format: media.format ?? "",
            resourceType: media.resource_type ?? "",
          } as CloudinaryMedia)
      )
      .filter((media: Record<string, any>) => media.publicId),

    votes: post.votes.map(function convertVote(
      vote: Record<string, any>
    ): Vote {
      const user = users.find((user) => user._id === vote.author_id);
      const authorName = user ? `${user.firstName} ${user.lastName}` : "";

      return {
        content: emojis[vote.category] ?? "",
        authorId: vote.author_id,
        authorName: authorName,
        createdAt: vote.created_at.$date ?? "",
      };
    }),

    comments: post.comments.map(function convertComment(
      comment: Record<string, any>
    ): Comment {
      const user = users.find((user) => user._id === comment.commenter_id);
      const authorName = user ? `${user.firstName} ${user.lastName}` : "";

      return {
        content: comment.comment,
        authorId: comment.commenter_id,
        authorName: authorName,
        createdAt: comment.created_at.$date ?? "",
      };
    }),
  };
}
