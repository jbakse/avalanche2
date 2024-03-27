import type { Meta, StoryObj } from "@storybook/react";

import { WeekBar } from "./WeekBar";

const meta = {
  title: "Avalanche/WeekBar",
  component: WeekBar,
  excludeStories: /data/,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof WeekBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const week = {
  name: "Intro",
  sketchCount: 15,
  isActive: false,
};

const weeks = [
  week,
  week,
  { ...week, isActive: true },
  week,
  week,
  week,
  week,
  week,
  week,
  week,
];

export const data = { week, weeks };

export const Default: Story = {
  args: {
    weeks,
  },
};
