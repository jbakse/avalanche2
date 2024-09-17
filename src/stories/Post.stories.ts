import type { Meta, StoryObj } from "@storybook/react";

import { Post, examplePostProps } from "./Post";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Post> = {
  title: "Avalanche/Post",
  component: Post,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: examplePostProps,
};

// export const Everything: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "🚀🕹💬👾️💬💬",
//     codeUrl: "#",
//     description:
//       "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
//     avatarUrl: "https://dummyimage.com/64",
//     date: new Date("1990-01-01 12:01 am"),
//     imageUrls: [
//       "https://dummyimage.com/512",
//       "https://dummyimage.com/512",
//       "https://dummyimage.com/512",
//     ],
//   }
// };

// export const TwoImages: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "🚀🕹💬👾️💬💬",
//     codeUrl: "",
//     description:
//       "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
//     avatarUrl: "https://dummyimage.com/64",
//     date: new Date("1990-01-01 12:01 am"),
//     imageUrls: ["https://dummyimage.com/512", "https://dummyimage.com/512"],
//   },
// };

// export const Minimum: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "",
//     codeUrl: "",
//     description: "",
//     avatarUrl: "https://dummyimage.com/64",
//     date: new Date("1990-01-01 12:01 am"),
//     imageUrls: [],
//   },
// };

// export const Tall: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "",
//     description: "",
//     date: new Date("1990-01-01 12:01 am"),
//     avatarUrl: "https://dummyimage.com/64",
//     imageUrls: [
//       "https://dummyimage.com/512x1024",
//       "https://dummyimage.com/512x1024",
//       "https://dummyimage.com/512x1024",
//     ],
//     codeUrl: "",
//   },
// };

// export const Wide: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "",
//     codeUrl: "",
//     description: "",
//     date: new Date("1990-01-01 12:01 am"),
//     avatarUrl: "https://dummyimage.com/64",
//     imageUrls: [
//       "https://dummyimage.com/1024x512",
//       "https://dummyimage.com/1024x512",
//       "https://dummyimage.com/1024x512",
//     ],
//   },
// };

// export const NoEmojiOrCode: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "",
//     codeUrl: "",
//     description:
//       "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
//     date: new Date("1990-01-01 12:01 am"),
//     avatarUrl: "https://dummyimage.com/64",
//     imageUrls: ["https://dummyimage.com/512"],
//   },
// };

// export const NoDescription: Story = {
//   args: {
//     author: "Ada Lovelace",
//     emojis: "🚀🕹💬👾️💬💬🚀🕹💬👾️💬💬🚀🚀🚀🚀🚀🚀👾️🚀🚀🚀👾️👾️🚀💬💬💬🚀",
//     codeUrl: "#",
//     description: "",
//     date: new Date("1990-01-01 12:01 am"),
//     avatarUrl: "https://dummyimage.com/64",
//     imageUrls: ["https://dummyimage.com/512"],
//   },
// };

// import posts from "../../data/2023_spring/posts_clean.json";
// // import users from "../../data/2023_spring/users.json";

// export const Real: Story = {
//   args: posts[3],
// };
