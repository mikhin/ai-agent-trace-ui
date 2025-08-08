import { type SpanCardType, SpanCard } from "ai-agent-trace-ui-core";
import { type ReactElement, useState } from "react";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";
import { sampleTreeViewData } from "../data/sample-tree-view-data.ts";

export const SpanCardPage = (): ReactElement => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  const handleSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedCardId(isSelected ? id : undefined);
    console.log(`Card ${id} selection changed to ${isSelected}`);
  };

  const rootSpan = sampleTreeViewData[0];
  const childSpan = rootSpan.children?.[0] || rootSpan;

  const noChildrenSpan: SpanCardType = {
    id: "no-children-span",
    title: "Span With No Children",
    startTime: new Date("2023-01-01T00:10:00Z"),
    endTime: new Date("2023-01-01T00:10:30Z"),
    tokensCount: 100,
    type: "llm_call",
    duration: 30,
    status: "success",
    cost: 5,
    children: undefined,
  };

  return (
    <>
      <SandboxSection
        title="SpanCard Basic Examples"
        description="Different levels and spans displayed with SpanCard component"
      >
        <SandboxItem title="Root Span (Level 0)" pattern="grid">
          <SpanCard
            minStart={0}
            maxEnd={10}
            expandButton="inside"
            data={rootSpan}
            level={0}
          />
        </SandboxItem>

        <SandboxItem title="Child Span (Level 1)">
          <SpanCard
            minStart={5}
            maxEnd={20}
            expandButton="inside"
            data={childSpan}
            level={1}
          />
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="SpanCard Selection"
        description="Demonstrating selection behavior of SpanCard components"
      >
        <SandboxItem
          title="Interactive Selection (Click to select)"
          pattern="grid"
        >
          <SpanCard
            minStart={0}
            maxEnd={10}
            expandButton="inside"
            data={rootSpan}
            level={0}
            selectedCardId={selectedCardId}
            onSelectionChange={handleSelectionChange}
          />

          <SpanCard
            minStart={5}
            maxEnd={20}
            expandButton="inside"
            data={childSpan}
            level={0}
            selectedCardId={selectedCardId}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>

        <SandboxItem title="Pre-selected Card">
          <SpanCard
            minStart={0}
            maxEnd={10}
            expandButton="inside"
            data={childSpan}
            level={1}
            selectedCardId={childSpan.id}
          />
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="SpanCard Edge Cases"
        description="Demonstrating edge cases for SpanCard components"
      >
        <SandboxItem title="Span With No Children" pattern="dots">
          <SpanCard
            minStart={0}
            maxEnd={10}
            expandButton="inside"
            data={noChildrenSpan}
            level={0}
            selectedCardId={selectedCardId}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>
      </SandboxSection>
    </>
  );
};
