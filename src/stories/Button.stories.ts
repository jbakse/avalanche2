import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Avalanche/Button",
  component: Button,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    primary: true,
    label: "Button",
  },
} satisfies Story;

export const Default = {
  args: {
    label: "Button",
  },
} satisfies Story;
