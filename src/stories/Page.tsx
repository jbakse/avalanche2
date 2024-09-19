import { useState } from "react";
import { Header } from "./Header";
import { UserBar } from "./UserBar";
import { WeekBar } from "./WeekBar";
import { Post } from "./Post";

import { Config, Post as PostData, User } from "../../data/data";

type PageProps = {
  prefs: Config;
  posts: PostData[];
  users: User[];
  _activeLesson: string;
};

export const Page = ({ prefs, posts, users, _activeLesson }: PageProps) => {
  const [activeLesson, setActiveLesson] = useState(_activeLesson);
  const postCount = posts.length;
  const activePosts = posts.filter((post) => post.lesson === activeLesson);

  return (
    <>
      <Header title={prefs.site_title} />
      <UserBar users={users} activeLesson={activeLesson} />
      <WeekBar
        activeLesson={activeLesson}
        weeks={prefs.weeks}
        onLessonChange={setActiveLesson}
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
