interface PostProps {
  author: string;
}

export const Post = ({ author = "unknown", ...props }: PostProps) => {
  return <div>Author: {author}</div>;
};
