import type { Meta, StoryObj } from "@storybook/react";
import { PostDetail } from "./PostDetail";
import { posts } from "../data/data";

const meta = {
  title: "Avalanche/PostDetail",
  component: PostDetail,
} satisfies Meta<typeof PostDetail>;
export default meta;

type Story = StoryObj<typeof PostDetail>;

export const Default = {
  args: {
    postData: posts[0],
    onClose: () => console.log("Close clicked"),
  },
} satisfies Story;
