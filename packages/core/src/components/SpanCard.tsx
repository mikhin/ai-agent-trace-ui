import * as Collapsible from "@radix-ui/react-collapsible";
import { useState, type FC, useCallback } from "react";

import type { Span } from "../types/span";

import { Badge } from "./Badge";

const MARGIN_LEVEL_STEP = 40;

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
  const [isExpanded, setIsExpanded] = useState(false);
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

  const marginLeft = level ? MARGIN_LEVEL_STEP : 0;

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      className="list-none"
    >
      <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="relative" style={{ marginLeft: `${marginLeft}px` }}>
          <div
            className={`cursor-pointer border p-4 ${
              isSelected ? "bg-blue-50" : "bg-white"
            }`}
            onClick={handleCardClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick();
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected}
            aria-describedby={`card-desc-${data.id}`}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-label={`Card: ${data.title}${hasChildren ? ". Has child items." : ""}`}
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.title}
                </h3>

                <div className="flex space-x-2">
                  <Badge variant="primary" size="sm">
                    {data.startTime.toLocaleString()} - {data.duration}ms
                  </Badge>
                  <Badge variant="success" size="sm">
                    {`Cost: $${data.cost.toFixed(2)}`}
                  </Badge>
                </div>
              </div>

              {hasChildren && (
                <Collapsible.Trigger asChild className="ml-2">
                  <button
                    className="p-2"
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
                      <span aria-hidden="true">&#9660;</span>
                    ) : (
                      <span aria-hidden="true">&#9654;</span>
                    )}
                  </button>
                </Collapsible.Trigger>
              )}
            </div>
          </div>

          {hasChildren && (
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
          )}
        </div>
      </Collapsible.Root>
    </li>
  );
};
