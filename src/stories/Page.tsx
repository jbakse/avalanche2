import { PostData } from "../data/data";
import { config, posts, users } from "../data/data";

import { Header } from "./Header";
import { UserBar } from "./UserBar";
import { LessonBar } from "./LessonBar";
import { Post } from "./Post";
import { UserProfile } from "./UserProfile";
import { PostDetail } from "./PostDetail";

import { UserData } from "../data/data";

type PageProps = {
  activeLesson: string | null;
  activeUser: UserData | null;
  activePost: PostData | null;
  onLessonChange?: (newActiveLesson: string | null) => void;
  onUserChange?: (newActiveUser: UserData | null) => void;
  onPostChange?: (newActivePost: PostData | null) => void;
};

export const Page = ({
  activeLesson,
  activeUser,
  activePost,
  onLessonChange,
  onUserChange,
  onPostChange,
}: PageProps) => {
  const postCount = posts.length;
  const activePosts = posts.filter((post) => {
    return (
      (!activeLesson || post.lessonName === activeLesson) &&
      (!activeUser || post.authorId === activeUser._id)
    );
  });

  return (
    <>
      {/* page header */}
      <Header title={config.site_title} />

      {/* user bar */}
      <UserBar
        users={users}
        activeLesson={activeLesson}
        activeUser={activeUser}
        onUserChange={onUserChange}
      />

      {/* user profile */}
      {activeUser && <UserProfile user={activeUser} onLessonChange={onLessonChange} />}

      {/* lesson bar */}
      <LessonBar
        activeLesson={activeLesson}
        activeUser={activeUser}
        lessons={config.lessons}
        onLessonChange={onLessonChange}
      />

      {/* sketch counts */}
      <div className="mt-4 text-center text-lg">
        {postCount} total sketches — {activePosts.length} {activeLesson}{" "}
        sketches.
      </div>

      {/* avalanche message */}
      <div className="mt-4 text-center text-lg">{config.avalanche_message}</div>

      {/* posts */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {activePosts.map((post) => (
          <Post
            key={post._id}
            {...post}
            onUserChange={onUserChange}
            onPostChange={onPostChange}
          />
        ))}
      </div>

      {/* post detail modal */}
      {activePost && (
        <PostDetail
          postData={activePost}
          onClose={() => onPostChange?.(null)}
        />
      )}
    </>
  );
};
