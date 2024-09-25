import { Route, useLocation } from "wouter";

import { Page } from "./stories/Page";
import {
  UserData,
  slugToLesson,
  slugToUser,
  slugForUser,
  slugForLesson,
} from "../data/data";

function App() {
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

          // function handlePostChange(newPostID: string) {
          //   navigate(
          //     `/${slugForUser(user)}/${slugForLesson(lesson)}/${newPostID}`,
          //   );
          // }

          return (
            <Page
              activeLesson={lesson}
              activeUser={user}
              onLessonChange={handleLessonChange}
              onUserChange={handleUserChange}
            />
          );
        }}
      </Route>
    </>
  );
}

export default App;
