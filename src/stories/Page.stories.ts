import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./Page";

import { data as weekBarData } from "./WeekBar.stories";
import { data as userBarData } from "./UserBar.stories";

const meta = {
  title: "Example/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

const post = {
  author: "Ada Lovelace",
  emojis: "🚀🕹💬👾️💬💬",
  codeUrl: "#",
  description:
    "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
  avatarUrl: "https://dummyimage.com/64",
  date: new Date("1990-01-01 12:01 am"),
  imageUrls: [
    "https://dummyimage.com/512",
    "https://dummyimage.com/512",
    "https://dummyimage.com/512",
  ],
};

export const LoggedIn: Story = {
  args: {
    title: "Avalanche 2",
    user: userBarData.users[0],
    users: userBarData.users,
    weeks: weekBarData.weeks,
    posts: [post],
  },
};
