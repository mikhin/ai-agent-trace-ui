import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export interface CollapsibleSectionProps {
  /**
   * The title text displayed in the trigger button
   */
  title: string;

  /**
   * The content to display when the section is expanded
   */
  children: React.ReactNode;

  /**
   * Whether the section starts in an open state
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Optional className for the root container
   */
  className?: string;

  /**
   * Optional className for the trigger button
   */
  triggerClassName?: string;

  /**
   * Optional className for the content area
   */
  contentClassName?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  triggerClassName = "",
  contentClassName = "",
}) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={`rounded-lg ${className}`}
    >
      <Collapsible.Trigger
        className={`mb-1 flex w-full items-center gap-2 rounded-lg px-1 py-3 text-left text-sm font-medium text-gray-700 dark:text-white ${triggerClassName}`}
      >
        <ChevronDown
          className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
        <span>{title}</span>
      </Collapsible.Trigger>

      <Collapsible.Content
        className={`data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown ${contentClassName}`}
      >
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
