import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconButton, IconButtonSource } from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${IconButtonSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the icon button",
      defaultValue: "md",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "ghost"],
      description: "The visual variant of the icon button",
      defaultValue: "default",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers (required)",
    },
    children: {
      control: "text",
      description: "Icon content (usually an icon component)",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Settings",
    children: "⚙",
  },
};

export const Size: Story = {
  args: {
    "aria-label": "Large settings button",
    children: "⚙",
    size: "lg",
  },
};

export const Variant: Story = {
  args: {
    "aria-label": "Ghost button",
    children: "✕",
    variant: "ghost",
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled button",
    children: "⚙",
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    "aria-label": "Small button",
    children: "↻",
    size: "sm",
  },
};
