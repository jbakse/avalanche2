import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Page } from "./Page";

import { UserData, PostData } from "../../data/data";

const meta = {
  title: "Avalanche/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {
  args: {
    activeLesson: "Introduction",
    activeUser: null,
    activePost: null,
  },
  render: function Render(args) {
    const [{ activeLesson, activeUser, activePost }, updateArgs] = useArgs();

    function handleLessonChange(newActiveLesson: string | null) {
      updateArgs({ activeLesson: newActiveLesson });
    }

    function handleUserChange(newActiveUser: UserData | null) {
      updateArgs({ activeUser: newActiveUser });
    }

    function handlePostChange(newActivePost: PostData | null) {
      updateArgs({ activePost: newActivePost });
    }

    return (
      <Page
        {...args}
        activeLesson={activeLesson}
        activeUser={activeUser}
        activePost={activePost}
        onLessonChange={handleLessonChange}
        onUserChange={handleUserChange}
        onPostChange={handlePostChange}
      />
    );
  },
} satisfies Story;
