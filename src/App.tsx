import { Route, useLocation } from "wouter";
import { useState } from "react";

import { Page } from "./stories/Page";
import {
  UserData,
  PostData,
  slugToLesson,
  slugToUser,
  slugForUser,
  slugForLesson,
} from "../data/data";

function App() {
  const [activePost, setActivePost] = useState<PostData | null>(null);

  return (
    <>
      <Route path="/:userSlug?/:lessonSlug?/:postID?">
        {(params) => {
          const lesson = slugToLesson(params.lessonSlug);
          const user = slugToUser(params.userSlug);

          const [_, navigate] = useLocation();

          function handleUserChange(newUser: UserData | null) {
            navigate(`/${slugForUser(newUser)}/${slugForLesson(lesson)}`);
          }

          function handleLessonChange(newLesson: string | null) {
            navigate(`/${slugForUser(user)}/${slugForLesson(newLesson)}`);
          }

          function handlePostChange(newPost: PostData | null) {
            setActivePost(newPost);
            if (newPost) {
              navigate(
                `/${slugForUser(user)}/${slugForLesson(lesson)}/${newPost._id}`,
              );
            } else {
              navigate(`/${slugForUser(user)}/${slugForLesson(lesson)}`);
            }
          }

          return (
            <Page
              activeLesson={lesson}
              activeUser={user}
              activePost={activePost}
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
