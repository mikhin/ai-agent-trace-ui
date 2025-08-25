import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsSource } from "ai-agent-trace-ui-core";

const mockTabItems = [
  {
    value: "tab1",
    label: "First Tab",
    content: <div className="p-4">Content of the first tab</div>,
  },
  {
    value: "tab2",
    label: "Second Tab",
    content: <div className="p-4">Content of the second tab</div>,
  },
  {
    value: "tab3",
    label: "Third Tab",
    content: <div className="p-4">Content of the third tab</div>,
  },
];

const tabItemsWithIcons = [
  {
    value: "settings",
    label: "Settings",
    icon: <span>⚙</span>,
    content: <div className="p-4">Settings panel content</div>,
  },
  {
    value: "profile",
    label: "Profile",
    icon: <span>👤</span>,
    content: <div className="p-4">Profile information content</div>,
  },
  {
    value: "notifications",
    label: "Notifications",
    icon: <span>🔔</span>,
    content: <div className="p-4">Notifications settings</div>,
    disabled: true,
  },
];

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
\`\`\`tsx
${TabsSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Array of tab items to display",
    },
    defaultValue: {
      control: "text",
      description: "The initially selected tab value (uncontrolled)",
    },
    theme: {
      control: { type: "select" },
      options: ["underline", "pill"],
      description: "Visual theme variant for the tabs",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: mockTabItems,
  },
};

export const DefaultValue: Story = {
  args: {
    items: mockTabItems,
    defaultValue: "tab2",
  },
};

export const Theme: Story = {
  args: {
    items: mockTabItems,
    theme: "pill",
  },
};

export const WithIcons: Story = {
  args: {
    items: tabItemsWithIcons,
  },
};
