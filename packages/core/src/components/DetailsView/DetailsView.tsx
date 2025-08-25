import type { ReactElement } from "react";

import { SquareTerminal, Tags } from "lucide-react";

import type { TraceSpan } from "../../types";
import type { AvatarProps } from "../Avatar";

import { Tabs } from "../Tabs";
import { DetailsViewAttributesTab } from "./DetailsViewAttributesTab";
import { DetailsViewHeader } from "./DetailsViewHeader";
import { DetailsViewMetrics } from "./DetailsViewMetrics";
import { DetailsViewRawDataTab } from "./DetailsViewRawDataTab";

interface DetailsViewProps {
  /**
   * The span data to display in the details view
   */
  data: TraceSpan;

  /**
   * Optional avatar configuration for the header
   */
  avatar?: AvatarProps;

  /**
   * The initially selected tab
   */
  defaultTab?: string;

  /**
   * Optional className for the root container
   */
  className?: string;

  /**
   * Configuration for the copy button functionality
   */
  copyButton?: {
    /**
     * Whether the copy button is enabled
     * @default false
     */
    isEnabled?: boolean;
    /**
     * Callback fired when copy button is clicked
     */
    onCopy?: (data: TraceSpan) => void;
  };

  /**
   * Callback fired when the active tab changes
   */
  onTabChange?: (tabValue: string) => void;
}

export const DetailsView = ({
  data,
  avatar,
  defaultTab,
  className,
  copyButton,
  onTabChange,
}: DetailsViewProps): ReactElement => {
  const tabItems = [
    {
      value: "attributes",
      label: "Attributes",
      icon: <Tags className="size-4" />,
      content: <DetailsViewAttributesTab data={data} />,
    },
    {
      value: "raw",
      label: "RAW",
      icon: <SquareTerminal className="size-4" />,
      content: <DetailsViewRawDataTab data={data} />,
    },
  ];

  return (
    <div
      className={`max-w-[480px] rounded border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-950 ${className}`}
    >
      <DetailsViewHeader data={data} avatar={avatar} copyButton={copyButton} />

      <DetailsViewMetrics data={data} />

      <Tabs
        items={tabItems}
        onValueChange={onTabChange}
        theme="underline"
        defaultValue={defaultTab}
      />
    </div>
  );
};
