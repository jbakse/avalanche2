import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Page } from "./Page";

import { config, posts, users, User } from "../../data/data";

const meta = {
  title: "Avalanche/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
  argTypes: {
    // hide prefs, posts, and users from the controls panel
    prefs: { table: { disable: true } },
    posts: { table: { disable: true } },
    users: { table: { disable: true } },
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {
  args: {
    prefs: config,
    posts: posts,
    users: users,
    activeLesson: "Introduction",
    activeUser: null,
  },
  render: function Render(args) {
    const [{ activeLesson, activeUser }, updateArgs] = useArgs();

    function handleLessonChange(newActiveLesson: string | null) {
      updateArgs({ activeLesson: newActiveLesson });
    }

    function handleUserChange(newActiveUser: User | null) {
      updateArgs({ activeUser: newActiveUser });
    }

    return (
      <Page
        {...args}
        activeLesson={activeLesson}
        activeUser={activeUser}
        onLessonChange={handleLessonChange}
        onUserChange={handleUserChange}
      />
    );
  },
} satisfies Story;
