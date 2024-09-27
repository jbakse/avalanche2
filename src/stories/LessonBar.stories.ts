import type { Meta, StoryObj } from "@storybook/react";

import { LessonBar } from "./LessonBar";

import { config } from "../data/data";

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
    activeUser: null,
    lessons: config.lessons,
  },
} satisfies Story;
