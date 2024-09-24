import { useState } from "react";
import { Page } from "./stories/Page";
import { UserData } from "../data/data";

function App() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<UserData | null>(null);

  return (
    <>
      <Page
        activeLesson={activeLesson}
        activeUser={activeUser}
        onLessonChange={setActiveLesson}
        onUserChange={setActiveUser}
      />
    </>
  );
}

export default App;
