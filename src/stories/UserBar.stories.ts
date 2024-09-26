import { users } from "../../data/data";
import type { Meta, StoryObj } from "@storybook/react";
import { UserBar } from "./UserBar";

const meta = {
  title: "Avalanche/UserBar",
  component: UserBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof UserBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FullClass = {
  args: {
    activeUser: null,
    activeLesson: null,
    users: users,
  },
} satisfies Story;

export const Single = {
  args: {
    activeUser: null,
    activeLesson: null,
    users: [users[0]],
  },
} satisfies Story;
