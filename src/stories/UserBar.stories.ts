import { cleanUsers } from "../../data/data";
import type { Meta, StoryObj } from "@storybook/react";
import { UserBar } from "./UserBar";

const meta = {
  title: "Avalanche/UserBar",
  component: UserBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof UserBar>;
export default meta;

type Story = StoryObj<typeof meta>;

// const users = cleanUsers.map((user) => ({
//   ...user,
//   weekPosts: 0,
//   totalPosts: 10,
// }));

export const FullClass = {
  args: {
    users: cleanUsers,
  },
} satisfies Story;

export const Single = {
  args: {
    users: [cleanUsers[0]],
  },
} satisfies Story;
