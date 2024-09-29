import type { Meta, StoryObj } from "@storybook/react";
import { UserCalendar } from "./UserCalendar";
import { users } from "../data/data";

const meta = {
  title: "Avalanche/UserCalendar",
  component: UserCalendar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof UserCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    user: users[0],
  },
} satisfies Story;
