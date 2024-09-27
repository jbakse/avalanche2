import type { Meta, StoryObj } from "@storybook/react";

import { posts } from "../data/data";

import { Post } from "./Post";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Post> = {
  title: "Avalanche/Post",
  component: Post,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: posts[0],
};
