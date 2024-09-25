import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { fn } from "@storybook/test";

const meta = {
  title: "Basic/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Primary = {
  args: {
    primary: true,
  },
} satisfies Story;
