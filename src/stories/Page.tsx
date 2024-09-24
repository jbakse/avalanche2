import { useState } from "react";

import { PostData } from "../../data/data";
import { config, posts, users } from "../../data/data";

import { Header } from "./Header";
import { UserBar } from "./UserBar";
import { LessonBar } from "./LessonBar";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";
import { PostDetail } from "./PostDetail";

import { UserData } from "../../data/data";

type PageProps = {
  activeLesson: string | null;
  activeUser: UserData | null;
  onLessonChange?: (newActiveLesson: string | null) => void;
  onUserChange?: (newActiveUser: UserData | null) => void;
};

export const Page = ({
  activeLesson,
  activeUser,
  onLessonChange,
  onUserChange,
}: PageProps) => {
  const postCount = posts.length;
  const activePosts = posts.filter((post) => {
    return (
      (!activeLesson || post.lessonName === activeLesson) &&
      (!activeUser || post.authorId === activeUser._id)
    );
  });
  const [activePost, setActivePost] = useState<PostData | null>(null);

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
          <Post
            key={post._id}
            {...post}
            onUserChange={onUserChange}
            onPostChange={setActivePost}
          />
        ))}
      </div>
      {activePost && (
        <PostDetail postData={activePost} onClose={() => setActivePost(null)} />
      )}
    </>
  );
};
