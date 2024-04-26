import type { Meta, StoryObj } from "@storybook/react";

import { Post, PostProps } from "./Post";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Avalanche/Post",
  component: Post,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Everything: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "🚀🕹💬👾️💬💬",
    codeUrl: "#",
    description:
      "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
    avatarUrl: "https://dummyimage.com/64",
    date: new Date("1990-01-01 12:01 am"),
    imageUrls: [
      "https://dummyimage.com/512",
      "https://dummyimage.com/512",
      "https://dummyimage.com/512",
    ],
  },
};

export const TwoImages: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "🚀🕹💬👾️💬💬",
    codeUrl: "",
    description:
      "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
    avatarUrl: "https://dummyimage.com/64",
    date: new Date("1990-01-01 12:01 am"),
    imageUrls: ["https://dummyimage.com/512", "https://dummyimage.com/512"],
  },
};

export const Minimum: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "",
    codeUrl: "",
    description: "",
    avatarUrl: "https://dummyimage.com/64",
    date: new Date("1990-01-01 12:01 am"),
    imageUrls: [],
  },
};

export const Tall: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "",
    description: "",
    date: new Date("1990-01-01 12:01 am"),
    avatarUrl: "https://dummyimage.com/64",
    imageUrls: [
      "https://dummyimage.com/512x1024",
      "https://dummyimage.com/512x1024",
      "https://dummyimage.com/512x1024",
    ],
    codeUrl: "",
  },
};

export const Wide: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "",
    codeUrl: "",
    description: "",
    date: new Date("1990-01-01 12:01 am"),
    avatarUrl: "https://dummyimage.com/64",
    imageUrls: [
      "https://dummyimage.com/1024x512",
      "https://dummyimage.com/1024x512",
      "https://dummyimage.com/1024x512",
    ],
  },
};

export const NoEmojiOrCode: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "",
    codeUrl: "",
    description:
      "I made this small program that can calculate the Bernoulli numbers. It's uses a recursive algorithm that's very efficient. I'm very proud of it.",
    date: new Date("1990-01-01 12:01 am"),
    avatarUrl: "https://dummyimage.com/64",
    imageUrls: ["https://dummyimage.com/512"],
  },
};

export const NoDescription: Story = {
  args: {
    author: "Ada Lovelace",
    emojis: "🚀🕹💬👾️💬💬🚀🕹💬👾️💬💬🚀🚀🚀🚀🚀🚀👾️🚀🚀🚀👾️👾️🚀💬💬💬🚀",
    codeUrl: "#",
    description: "",
    date: new Date("1990-01-01 12:01 am"),
    avatarUrl: "https://dummyimage.com/64",
    imageUrls: ["https://dummyimage.com/512"],
  },
};

import posts from "../../data/2023_spring/posts.json";

export const Real: Story = {
  args: extractPostProps(posts[0]),
};

function extractPostProps(input: unknown): PostProps {
  // initialize required properties
  const postProps: PostProps = {
    date: new Date("2000-01-01 12:00 am"),
    imageUrls: [],
    avatarUrl: "",
  };

  // if input is not an object, return the default properties
  if (typeof input !== "object" || input === null) return postProps;

  const data = input as { [key: string]: unknown };

  if (isString(data.author)) postProps.author = data.author;

  if (Array.isArray(data.votes)) {
    const emojis: { [key: string]: string } = {
      funny: "😂",
      nerdy: "🤓",
      pretty: "😍",
    };
    postProps.emojis = data.votes
      .map((vote) => emojis[vote.category] ?? undefined)
      .filter(isString)
      .join("");
  }

  if (isString(data.description)) postProps.description = data.description;
  if (isString(data.date)) postProps.date = new Date(data.date);
  if (isString(data.codeUrl)) postProps.codeUrl = data.codeUrl;

  if (Array.isArray(data.cloudinary_media)) {
    postProps.imageUrls = data.cloudinary_media
      .map((item) => {
        if (typeof item !== "object" || item === null) return undefined;
        const data = item as { [key: string]: unknown };
        if (isString(data.public_id)) return data.public_id;
        return undefined;
      })
      .filter(isString)
      .map(
        (public_id) =>
          `https://res.cloudinary.com/compform2023spring/image/upload/c_fill,f_auto,q_auto:best,w_350/v1/${public_id}`
      );
  }

  if (isString(data.avatarUrl)) postProps.avatarUrl = data.avatarUrl;

  return postProps;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => isString(item));
}
