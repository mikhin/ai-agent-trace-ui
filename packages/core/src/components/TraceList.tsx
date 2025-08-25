import cn from "classnames";
import { ArrowLeft } from "lucide-react";

import type { TraceRecord } from "../types";

import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { TraceListItem } from "./TraceListItem";

type TraceListProps = {
  traces: TraceRecord[];
  expanded: boolean;
  onExpandStateChange: (expanded: boolean) => void;
  className?: string;
};

export const TraceList = ({
  traces,
  expanded,
  onExpandStateChange,
  className,
}: TraceListProps) => {
  return (
    <div
      className={cn(
        "w-full",
        "flex flex-col gap-3",
        expanded ? "w-full" : "w-fit",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2
            className={cn(
              "font-regular text-base text-gray-950 dark:text-gray-200",
              !expanded && "hidden",
            )}
          >
            Traces
          </h2>

          <Badge
            size="sm"
            theme="gray"
            aria-label={`Total number of traces: ${traces.length}`}
          >
            {traces.length}
          </Badge>
        </div>

        <IconButton
          aria-label={expanded ? "Collapse Trace List" : "Expand Trace List"}
          onClick={() => onExpandStateChange(!expanded)}
          size="sm"
        >
          <ArrowLeft
            className={cn(
              "size-3 transition-transform",
              expanded ? "" : "rotate-180",
            )}
          />
        </IconButton>
      </header>

      {expanded && (
        <ul className="flex flex-col items-center rounded border border-gray-200 dark:border-gray-800">
          {traces.map((trace, idx) => (
            <li className="w-full list-none" key={trace.id}>
              <TraceListItem {...trace} />

              {idx < traces.length - 1 && (
                <div className="h-px w-[calc(100%_-_32px)] bg-gray-200 dark:bg-gray-900" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
