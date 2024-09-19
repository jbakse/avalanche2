import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./Page";

import { cleanPrefs, cleanPosts, cleanUsers } from "../../data/data";

const meta = {
  title: "Avalanche/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn = {
  args: {
    prefs: cleanPrefs,
    posts: cleanPosts,
    users: cleanUsers,
    activeLesson: "Random",
  },
} satisfies Story;
