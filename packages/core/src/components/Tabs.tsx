import * as RadixTabs from "@radix-ui/react-tabs";
import * as React from "react";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type TabTheme = "underline" | "pill";

const BASE_TRIGGER =
  "text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 data-[state=active]:text-gray-900 dark:text-gray-500 dark:hover:text-white dark:data-[state=active]:text-white";

const THEMES = {
  underline: {
    list: "flex border-b border-gray-300 dark:border-gray-600",
    trigger: `w-full justify-center px-4 py-2 ${BASE_TRIGGER} border-b-2 border-transparent data-[state=active]:border-gray-900 -mb-[2px] dark:border-gray-600 dark:data-[state=active]:border-gray-400`,
  },
  pill: {
    list: "inline-flex gap-1 p-1 bg-gray-100 rounded-lg",
    trigger: `px-4 py-1.5 ${BASE_TRIGGER} rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:bg-gray-800 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:shadow-none`,
  },
} as const;

export interface TabsProps {
  /**
   * Array of tab items to display
   */
  items: TabItem[];

  /**
   * The initially selected tab value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * The currently selected tab value (controlled)
   */
  value?: string;

  /**
   * Callback fired when the selected tab changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Visual theme variant for the tabs
   */
  theme?: TabTheme;

  /**
   * Optional className for the root container
   */
  className?: string;

  /**
   * Optional className for the tabs list container
   */
  tabsListClassName?: string;

  /**
   * Optional className for individual tab triggers
   */
  triggerClassName?: string;

  /**
   * Optional className for the tab content area
   */
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  value,
  onValueChange,
  theme = "underline",
  className = "",
  tabsListClassName = "",
  triggerClassName = "",
  contentClassName = "",
  ...props
}) => {
  const defaultTab = defaultValue || items[0]?.value;

  const currentTheme = THEMES[theme];

  return (
    <RadixTabs.Root
      className={`w-full ${className}`}
      defaultValue={!value ? defaultTab : undefined}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <RadixTabs.List
        className={`${currentTheme.list} ${tabsListClassName}`}
        aria-label="Navigation tabs"
      >
        {items.map((item: TabItem) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={`flex items-center ${currentTheme.trigger} ${triggerClassName}`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {items.map((item: TabItem) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className={contentClassName}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
