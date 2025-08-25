import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInput, TextInputSource } from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${TextInputSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the input (required)",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    hideLabel: {
      control: "boolean",
      description:
        "Whether to visually hide the label while keeping it for screen readers",
      defaultValue: false,
    },
    clearable: {
      control: "boolean",
      description: "Whether to show a clear button when input has value",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
      defaultValue: false,
    },
    startIcon: {
      description: "Icon to display at the start of the input",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-input",
    placeholder: "Enter text...",
  },
};

export const Label: Story = {
  args: {
    id: "labeled-input",
    label: "Username",
    placeholder: "Enter username...",
  },
};

export const HideLabel: Story = {
  args: {
    id: "hidden-label-input",
    label: "Search",
    hideLabel: true,
    placeholder: "Search...",
  },
};

export const Clearable: Story = {
  args: {
    id: "clearable-input",
    label: "Email",
    placeholder: "Enter email...",
    clearable: true,
    defaultValue: "example@domain.com",
  },
};

export const StartIcon: Story = {
  args: {
    id: "icon-input",
    label: "Search",
    placeholder: "Search...",
    startIcon: <span>🔍</span>,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "Disabled Field",
    placeholder: "Cannot type here...",
    disabled: true,
    defaultValue: "Disabled value",
  },
};
