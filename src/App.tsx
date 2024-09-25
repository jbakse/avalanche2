import { Route, useLocation } from "wouter";
import { Page } from "./stories/Page";
import {
  UserData,
  PostData,
  slugToLesson,
  slugToUser,
  slugForUser,
  slugForLesson,
  posts,
} from "../data/data";

function App() {
  return (
    <>
      <Route path="/:userSlug?/:lessonSlug?/:postID?">
        {(params) => {
          const lesson = slugToLesson(params.lessonSlug);
          const user = slugToUser(params.userSlug);
          const post = posts.find((post) => post._id === params.postID) ?? null;

          const [_, navigate] = useLocation();

          function handleUserChange(newUser: UserData | null) {
            navigate(`/${slugForUser(newUser)}/${slugForLesson(lesson)}/`);
          }

          function handleLessonChange(newLesson: string | null) {
            navigate(`/${slugForUser(user)}/${slugForLesson(newLesson)}/`);
          }

          function handlePostChange(newPost: PostData | null) {
            navigate(
              `/${slugForUser(user)}/${slugForLesson(lesson)}/${newPost?._id ?? ""}`,
            );
          }

          return (
            <Page
              activeLesson={lesson}
              activeUser={user}
              activePost={post}
              onLessonChange={handleLessonChange}
              onUserChange={handleUserChange}
              onPostChange={handlePostChange}
            />
          );
        }}
      </Route>
    </>
  );
}

export default App;
