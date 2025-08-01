import { SpanCard, SpanCardsList } from "ai-agent-trace-ui-core";
import { useState, type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";
import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const SpanCardsListPage = (): ReactElement => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  return (
    <SandboxSection
      title="Span Cards List"
      description="A hierarchical tree view of spans with collapsible sections"
    >
      <SandboxItem title="Basic Usage" pattern="dots">
        <SpanCardsList>
          {sampleTreeViewData.map((span) => (
            <SpanCard
              expandButton="inside"
              key={span.id}
              data={span}
              level={0}
              selectedCardId={selectedCardId}
              onSelectionChange={(id, isSelected) => {
                setSelectedCardId(isSelected ? id : undefined);
              }}
            />
          ))}
        </SpanCardsList>
      </SandboxItem>
    </SandboxSection>
  );
};
