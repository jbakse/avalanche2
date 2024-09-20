import { Header } from "./Header";
import { UserBar } from "./UserBar";
import { WeekBar } from "./WeekBar";
import { Post } from "./Post";

import { Config, Post as PostData, User } from "../../data/data";

type PageProps = {
  prefs: Config;
  posts: PostData[];
  users: User[];
  activeLesson: string;
  activeUser: User | null;
  onLessonChange?: (newActiveLesson: string) => void;
  onUserChange?: (newActiveUser: User | null) => void;
};

export const Page = ({
  prefs,
  posts,
  users,
  activeLesson,
  activeUser,
  onLessonChange,
  onUserChange,
}: PageProps) => {
  const postCount = posts.length;
  const activePosts = posts.filter((post) => post.lesson === activeLesson);

  return (
    <>
      <Header title={prefs.site_title} />
      <UserBar
        users={users}
        activeLesson={activeLesson}
        activeUser={activeUser}
        onUserChange={onUserChange}
      />
      <WeekBar
        activeLesson={activeLesson}
        weeks={prefs.weeks}
        onLessonChange={onLessonChange}
      />
      <div className="mt-4 text-lg text-center">
        {postCount} total sketches — {activePosts.length} {activeLesson}{" "}
        sketches.
      </div>
      <div className="mt-4 text-lg text-center">{prefs.avalanche_message}</div>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {activePosts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </>
  );
};
