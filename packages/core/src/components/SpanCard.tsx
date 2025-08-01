import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, type FC, useCallback, type KeyboardEvent } from "react";

import type { Span } from "../types/span";

import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

const MARGIN_LEVEL_STEP = 20;
const BASE_HORIZONTAL_LINE_WIDTH = 8;

const STATUS_COLOR_MAP = {
  success: "bg-green-500 dark:bg-green-700",
  error: "bg-red-500 dark:bg-red-700",
  running: "bg-violet-500 dark:bg-violet-700",
  warning: "bg-yellow-500 dark:bg-yellow-700",
};

interface SpanCardProps {
  data: Span;
  level?: number;
  selectedCardId?: string;
  onSelectionChange?: (cardId: string, isSelected: boolean) => void;
}

export const SpanCard: FC<SpanCardProps> = ({
  data,
  level = 0,
  selectedCardId,
  onSelectionChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = data.children && data.children.length > 0;
  const isSelected = selectedCardId === data.id;

  const handleCardClick = useCallback(() => {
    onSelectionChange?.(data.id, !isSelected);
  }, [data.id, isSelected, onSelectionChange]);

  const handleChildSelectionChange = useCallback(
    (childId: string, childIsSelected: boolean) => {
      onSelectionChange?.(childId, childIsSelected);
    },
    [onSelectionChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  const marginLeft = level !== 0 ? MARGIN_LEVEL_STEP : 0;
  const statusColor = STATUS_COLOR_MAP[data.status] || "bg-gray-500";
  const horizontalLineStyle =
    BASE_HORIZONTAL_LINE_WIDTH + (hasChildren ? 0 : MARGIN_LEVEL_STEP);
  const contentWidth = 300 - level * MARGIN_LEVEL_STEP;

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      className="list-none"
    >
      <Collapsible.Root
        open={isExpanded}
        onOpenChange={setIsExpanded}
        style={{ marginLeft: `${marginLeft}px` }}
      >
        <div
          className="relative box-content grid h-5 w-full cursor-pointer items-center pb-3"
          style={{
            gridTemplateColumns: `12px 16px ${contentWidth}px auto 50px 6px`,
            gap: "8px",
          }}
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-pressed={isSelected}
          aria-describedby={`span-card-desc-${data.id}`}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={`${isSelected ? "Selected" : "Not selected"} span card for ${data.title} at level ${level}`}
        >
          {/* Card Content */}
          {/* Horizontal line to connect parent and children */}
          {level !== 0 && (
            <div
              className="absolute -left-[11px] top-2.5 h-0.5 bg-gray-100"
              style={{
                width: `${horizontalLineStyle}px`,
              }}
            />
          )}

          {hasChildren ? (
            <Collapsible.Trigger asChild>
              <button
                className="flex size-3 items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${data.title} children`}
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <ChevronDown aria-hidden="true" className="text-gray-500" />
                ) : (
                  <ChevronRight aria-hidden="true" className="text-gray-500" />
                )}
              </button>
            </Collapsible.Trigger>
          ) : (
            <>
              {/* Invisible placeholder for alignment when no children */}
              <div className="w-3" aria-hidden="true" />
            </>
          )}

          <Avatar size="xs" rounded="full" />

          <div className="flex items-center">
            <h3 className="mr-3 max-w-32 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5">
              {data.title}
            </h3>

            <div className="flex items-center justify-start space-x-1">
              <Badge theme="cyan" size="xs">
                {data.type}
              </Badge>

              <Badge theme="gray" size="xs">
                {data.tokensCount}
              </Badge>

              <Badge theme="gray" size="xs">
                {data.cost}
              </Badge>
            </div>
          </div>

          {/* Timeline */}
          <span
            aria-hidden="true"
            className="flex h-3.5 w-full items-center justify-self-start rounded bg-gray-100 px-1 py-1"
          >
            <span className="h-1.5 w-full rounded-sm bg-purple-400" />
          </span>

          <span className="justify-self-end text-xs leading-3">
            {data.duration}
          </span>

          <span
            className={`size-1.5 rounded-full ${statusColor}`}
            aria-label={`Status: ${data.status}`}
            title={`Status: ${data.status}`}
          />
        </div>

        {hasChildren && (
          <div className="relative">
            {/* Vertical line to connect parent and children */}
            <div className="absolute -top-3 ml-2 h-[calc(100%-9px)] w-0.5 translate-x-1/2 transform bg-gray-100" />

            <Collapsible.Content>
              <ul role="group">
                {data.children?.map((child) => (
                  <SpanCard
                    key={child.id}
                    data={child}
                    level={level + 1}
                    selectedCardId={selectedCardId}
                    onSelectionChange={handleChildSelectionChange}
                  />
                ))}
              </ul>
            </Collapsible.Content>
          </div>
        )}
      </Collapsible.Root>
    </li>
  );
};
