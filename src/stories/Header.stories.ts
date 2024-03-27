import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Avalanche/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    title: "Avalanche",
    user: {
      name: "Jane Doe",
      avatarUrl: "https://dummyimage.com/128",
      isAdmin: false,
    },
  },
};

export const LoggedOut: Story = {
  args: {
    title: "Avalanche",
  },
};
