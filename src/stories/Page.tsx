import { Header } from "./Header";
import { UserBar, User } from "./UserBar";
import { WeekBar, Week } from "./WeekBar";
import { Post, PostProps } from "./Post";

interface PageProps {
  title: string;
  user?: User;
  users: User[];
  weeks: Week[];
  posts: PostProps[];
  message: string;
  postCount: number;
  topic: string;
}

export const Page = ({
  title,
  user,
  postCount,
  topic,
  users = [],
  weeks = [],
  posts = [],
  message,
}: PageProps) => {
  return (
    <>
      <Header title={title} user={user} />
      <UserBar users={users} />
      <WeekBar weeks={weeks} />
      <div className="mt-4 text-lg text-center">
        {postCount} Sketches Total — {posts.length} {topic} sketches.
      </div>
      <div className="mt-4 text-lg text-center">{message}</div>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </>
  );
};
