import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarSource } from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${AvatarSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "The image source for the avatar",
    },
    alt: {
      control: "text",
      description: "The alt text for the avatar",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the avatar",
      defaultValue: "md",
    },
    letter: {
      control: "text",
      description:
        "Custom letter to display (will use first letter of alt if not provided)",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the avatar",
      defaultValue: "full",
    },
    bgColor: {
      control: { type: "select" },
      options: [
        "gray",
        "red",
        "orange",
        "yellow",
        "teal",
        "indigo",
        "purple",
        "sky",
        "cyan",
        "emerald",
      ],
      description: "Background color theme for the letter avatar",
      defaultValue: "gray",
    },
    textColor: {
      control: { type: "select" },
      options: ["white", "black"],
      description: "Text color for the letter avatar",
      defaultValue: "white",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Sarah Johnson",
  },
};

export const Size: Story = {
  args: {
    alt: "Large",
    bgColor: "indigo",
    size: "lg",
  },
};

export const Letter: Story = {
  args: {
    letter: "JD",
    alt: "John Doe",
    bgColor: "indigo",
  },
};

export const BgColor: Story = {
  args: {
    alt: "Red Avatar",
    bgColor: "red",
  },
};

export const TextColor: Story = {
  args: {
    alt: "Black Text",
    bgColor: "yellow",
    textColor: "black",
  },
};

export const Rounded: Story = {
  args: {
    alt: "Square",
    bgColor: "purple",
    rounded: "none",
  },
};
