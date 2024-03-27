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
}

export const Page = ({
  title,
  user,
  users = [],
  weeks = [],
  posts = [],
}: PageProps) => {
  return (
    <>
      <Header title={title} user={user} />
      <UserBar users={users} />
      <WeekBar weeks={weeks} />
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Post {...posts[0]} />
        <Post {...posts[0]} />
        <Post {...posts[0]} />
        <Post {...posts[0]} />
        <Post {...posts[0]} />
      </div>
    </>
  );
};
