import type { Meta, StoryObj } from "@storybook/react";

import { LessonBar } from "./WeekBar";

import { config } from "../../data/data";

const meta = {
  title: "Avalanche/LessonBar",
  component: LessonBar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LessonBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    activeLesson: "Random",
    lessons: config.lessons,
  },
} satisfies Story;
