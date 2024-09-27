import type { Meta, StoryObj } from "@storybook/react";
import { UserProfile } from "./UserProfile";
import { users } from "../data/data";

const meta = {
  title: "Avalanche/UserProfile",
  component: UserProfile,
  parameters: { layout: "centered" },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: users[0],
  },
} satisfies Story;
