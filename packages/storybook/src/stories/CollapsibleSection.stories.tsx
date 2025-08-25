import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CollapsibleSection,
  CollapsibleSectionSource,
} from "ai-agent-trace-ui-core";

const meta = {
  title: "Components/CollapsibleSection",
  component: CollapsibleSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${CollapsibleSectionSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title text for the collapsible section",
    },
    children: {
      control: "text",
      description: "The content to display when expanded",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the section is open by default",
      defaultValue: false,
    },
    className: {
      control: "text",
      description: "Optional className for the root container",
    },
    triggerClassName: {
      control: "text",
      description: "Optional className for the trigger button",
    },
    contentClassName: {
      control: "text",
      description: "Optional className for the content area",
    },
  },
} satisfies Meta<typeof CollapsibleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Section Title",
    children:
      "This is the collapsible content that can be expanded or collapsed.",
  },
};

export const DefaultOpen: Story = {
  args: {
    title: "Open by Default",
    children: "This section starts in an open state.",
    defaultOpen: true,
  },
};
