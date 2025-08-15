import { useState, useCallback, type FC } from "react";

import type { SpanCardType } from "../types/span";

import { findTimeRange } from "../services/find-time-range.ts";
import { flattenSpans } from "../services/flatten-span-cards.ts";
import { SpanCard } from "./SpanCard";
import {
  CollapseAllButton,
  ExpandAllButton,
} from "./SpanCard/components/Controls.tsx";
import { SearchInput } from "./SpanCard/components/Search.tsx";

interface TreeViewProps {
  spans: SpanCardType[];
  onSelectionChange?: (selectedId: string | undefined) => void;
  className?: string;
  initialSelectedId?: string;
  expandButton: "inside" | "outside";
}

export const TreeView: FC<TreeViewProps> = ({
  spans,
  onSelectionChange,
  className = "",
  initialSelectedId,
  expandButton,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialSelectedId,
  );

  const allCards = flattenSpans(spans);

  const { minStart, maxEnd } = findTimeRange(allCards);

  const handleCardSelectionChange = useCallback(
    (cardId: string, isSelected: boolean) => {
      const newSelectedId = isSelected ? cardId : undefined;
      setSelectedCardId(newSelectedId);
      onSelectionChange?.(newSelectedId);
    },
    [onSelectionChange],
  );

  return (
    <div className={`border bg-white dark:bg-gray-950 ${className}`}>
      <div className="flex items-center justify-between border-b p-3">
        <SearchInput onSearch={() => {}} />

        <div className="flex w-full items-center gap-2">
          <div className="ml-auto flex items-center gap-3">
            <ExpandAllButton onExpandAll={() => {}} />
            <CollapseAllButton onCollapseAll={() => {}} />
          </div>
        </div>
      </div>

      <div className="p-2">
        <ul
          className={className}
          role="tree"
          aria-label="Hierarchical card list"
        >
          {spans.map((span) => (
            <SpanCard
              expandButton={expandButton}
              key={span.id}
              data={span}
              level={0}
              selectedCardId={selectedCardId}
              onSelectionChange={handleCardSelectionChange}
              minStart={minStart}
              maxEnd={maxEnd}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
