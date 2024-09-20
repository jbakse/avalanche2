import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Page } from "./Page";

import { config, posts, users } from "../../data/data";

const meta = {
  title: "Avalanche/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main = {
  args: {
    prefs: config,
    posts: posts,
    users: users,
    activeLesson: "Introduction",
  },
  render: function Render(args) {
    const [{ activeLesson }, updateArgs] = useArgs();

    function handleLessonChange(newActiveLesson: string) {
      updateArgs({ activeLesson: newActiveLesson });
    }

    return (
      <Page
        {...args}
        activeLesson={activeLesson}
        onLessonChange={handleLessonChange}
      />
    );
  },
} satisfies Story;
