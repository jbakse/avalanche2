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
  argTypes: {
    // author: { control: "text" },
  },
  args: {},
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    author: "Ada Lovelace",
  },
};
