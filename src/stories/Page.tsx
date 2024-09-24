import { Header } from "./Header";
import { UserBar } from "./UserBar";
import { LessonBar } from "./LessonBar";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";

import { Config, Post as PostData, User } from "../../data/data";

type PageProps = {
  config: Config;
  posts: PostData[];
  users: User[];
  activeLesson: string | null;
  activeUser: User | null;
  onLessonChange?: (newActiveLesson: string | null) => void;
  onUserChange?: (newActiveUser: User | null) => void;
};

export const Page = ({
  config,
  posts,
  users,
  activeLesson,
  activeUser,
  onLessonChange,
  onUserChange,
}: PageProps) => {
  const postCount = posts.length;
  const activePosts = posts.filter((post) => {
    return (
      (!activeLesson || post.lesson === activeLesson) &&
      (!activeUser || post.author_id === activeUser._id)
    );
  });
  return (
    <>
      <Header title={config.site_title} />
      <UserBar
        users={users}
        activeLesson={activeLesson}
        activeUser={activeUser}
        onUserChange={onUserChange}
      />
      {activeUser && <UserProfile user={activeUser} />}
      <LessonBar
        activeLesson={activeLesson}
        activeUser={activeUser}
        lessons={config.lessons}
        onLessonChange={onLessonChange}
      />
      <div className="mt-4 text-lg text-center">
        {postCount} total sketches — {activePosts.length} {activeLesson}{" "}
        sketches.
      </div>
      <div className="mt-4 text-lg text-center">{config.avalanche_message}</div>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {activePosts.map((post) => (
          <Post key={post._id} {...post} onUserChange={onUserChange} />
        ))}
      </div>
    </>
  );
};
