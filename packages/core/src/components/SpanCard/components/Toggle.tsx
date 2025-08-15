import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type KeyboardEvent, type MouseEvent } from "react";

interface SpanCardToggleProps {
  isExpanded: boolean;
  title: string;
  onToggleClick: (e: MouseEvent | KeyboardEvent) => void;
}

export const SpanCardToggle = ({
  isExpanded,
  title,
  onToggleClick,
}: SpanCardToggleProps) => (
  <Collapsible.Trigger asChild>
    <button
      className="flex size-3 items-center justify-center"
      onClick={onToggleClick}
      onKeyDown={onToggleClick}
      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title} children`}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown aria-hidden="true" className="text-gray-500" />
      ) : (
        <ChevronRight aria-hidden="true" className="text-gray-500" />
      )}
    </button>
  </Collapsible.Trigger>
);
