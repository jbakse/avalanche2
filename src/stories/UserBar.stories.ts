import type { Meta, StoryObj } from "@storybook/react";

import { UserBar } from "./UserBar";

const meta = {
  title: "Avalanche/UserBar",
  component: UserBar,
  excludeStories: /data/,
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
  weekSketches: 0,
  totalSketches: 10,
};

const user1 = {
  name: "Jane Doe",
  avatarUrl: "https://dummyimage.com/128",
  isAdmin: false,
  weekSketches: 1,
  totalSketches: 10,
};

const user2 = {
  name: "Jane Doe",
  avatarUrl: "https://dummyimage.com/128",
  isAdmin: false,
  weekSketches: 2,
  totalSketches: 10,
};

const user3 = {
  name: "Jane Doe",
  avatarUrl: "https://dummyimage.com/128",
  isAdmin: false,
  weekSketches: 3,
  totalSketches: 10,
};

const user4 = {
  name: "Jane Doe",
  avatarUrl: "https://dummyimage.com/128",
  isAdmin: false,
  weekSketches: 4,
  totalSketches: 10,
};

const users = [user, user1, user2, user3, user4, user, user, user, user, user];
export const data = { users };

export const FullClass: Story = {
  args: {
    users,
  },
};

export const OnePerson: Story = {
  args: {
    users: [user],
  },
};
