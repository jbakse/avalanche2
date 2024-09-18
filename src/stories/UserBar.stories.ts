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

const users = cleanUsers.map((user) => ({
  ...user,
  weekSketches: 0,
  totalSketches: 10,
}));

export const FullClass = {
  args: {
    users,
  },
} satisfies Story;

export const Single = {
  args: {
    users: [users[0]],
  },
} satisfies Story;
