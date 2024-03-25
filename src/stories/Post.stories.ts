import type { Meta, StoryObj } from "@storybook/react";

import { Post } from "./Post";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Avalanche/Post",
  component: Post,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "🚀🕹💬👾️💬💬",
    description:
      "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
    date: new Date("1990-01-01 12:01 am"),
    avatarUrl: "https://dummyimage.com/64",
    imageUrls: [
      "https://dummyimage.com/512",
      "https://dummyimage.com/512",
      "https://dummyimage.com/512",
    ],
    codeUrl: "#",
  },
};
