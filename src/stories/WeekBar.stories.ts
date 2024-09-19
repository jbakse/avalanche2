import type { Meta, StoryObj } from "@storybook/react";

import { WeekBar } from "./WeekBar";

import { config } from "../../data/data";

const meta = {
  title: "Avalanche/WeekBar",
  component: WeekBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WeekBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    activeLesson: "Random",
    weeks: config.weeks,
  },
} satisfies Story;
