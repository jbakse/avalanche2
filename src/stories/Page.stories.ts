import type { Meta, StoryObj } from "@storybook/react";

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
    _activeLesson: "Introduction",
  },
} satisfies Story;
