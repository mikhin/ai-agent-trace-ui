import { useState, useCallback, type FC } from "react";

import type { Span } from "../types/span";

import { Badge } from "./Badge.tsx";
import { SpanCard } from "./SpanCard";
import { SpanCardsList } from "./SpanCardsList";

interface TreeViewProps {
  spans: Span[];
  onSelectionChange?: (selectedId: string | undefined) => void;
  className?: string;
  initialSelectedId?: string;
}

export const TreeView: FC<TreeViewProps> = ({
  spans,
  onSelectionChange,
  className = "",
  initialSelectedId,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialSelectedId,
  );

  const countTotalSpans = (items: Span[]): number => {
    return items.reduce((count, item) => {
      return count + 1 + (item.children ? countTotalSpans(item.children) : 0);
    }, 0);
  };

  const totalSpans = countTotalSpans(spans);

  const handleCardSelectionChange = useCallback(
    (cardId: string, isSelected: boolean) => {
      const newSelectedId = isSelected ? cardId : undefined;
      setSelectedCardId(newSelectedId);
      onSelectionChange?.(newSelectedId);
    },
    [onSelectionChange],
  );

  return (
    <div className={`border bg-white ${className}`}>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex w-full items-center gap-2">
          <h3>Span Tree</h3>

          <Badge variant="warning">
            {totalSpans} {totalSpans === 1 ? "Span" : "Spans"}
          </Badge>

          <Badge variant="neutral">{spans.length} Top-Level Spans</Badge>

          <div className="ml-auto flex items-center gap-3">
            <button type="button">Expand all</button>
            <button type="button">Collapse all</button>
          </div>
        </div>
      </div>

      <div className="p-2">
        <SpanCardsList>
          {spans.map((span) => (
            <SpanCard
              key={span.id}
              data={span}
              level={0}
              selectedCardId={selectedCardId}
              onSelectionChange={handleCardSelectionChange}
            />
          ))}
        </SpanCardsList>
      </div>
    </div>
  );
};
