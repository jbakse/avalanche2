import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./Page";

import { data as weekBarData } from "./WeekBar.stories";
import { data as userBarData } from "./UserBar.stories";

import { examplePostProps } from "./Post";

const meta: Meta<typeof Page> = {
  title: "Avalanche/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    title: "Avalanche 2",
    message: "Hello, world!!!",
    postCount: 412,
    topic: "math",
    user: userBarData.users[0],
    users: userBarData.users,
    weeks: weekBarData.weeks,
    posts: [examplePostProps, examplePostProps],
  },
};
