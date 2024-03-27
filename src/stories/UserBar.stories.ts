import type { Meta, StoryObj } from "@storybook/react";

import { UserBar } from "./UserBar";

const meta = {
  title: "Example/UserBar",
  component: UserBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof UserBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const user = {
  name: "Jane Doe",
  avatarUrl: "https://dummyimage.com/128",
  isAdmin: false,
  weekSketches: 3,
  totalSketches: 10,
};

export const FullClass: Story = {
  args: {
    users: [user, user, user, user, user, user, user, user, user, user],
  },
};

export const OnePerson: Story = {
  args: {
    users: [user],
  },
};
