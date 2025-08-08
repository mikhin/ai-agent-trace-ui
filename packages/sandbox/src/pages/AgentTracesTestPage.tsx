import {
  convertOTelDocumentToSpanCards,
  TreeView,
  type OpenTelemetryDocument,
} from "ai-agent-trace-ui-core";
import { type ReactElement, useState } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";
import quoTavAgentDataRaw from "../data/quo_tav_agent.json";
import ragEarningsAgentDataRaw from "../data/rag_earnings_agent.json";
import smolDeepResearchAgentDataRaw from "../data/smol_deep_research_agent.json";

const quoTavAgentData = quoTavAgentDataRaw as OpenTelemetryDocument[];
const ragEarningsAgentData = ragEarningsAgentDataRaw as OpenTelemetryDocument[];
const smolDeepResearchAgentData =
  smolDeepResearchAgentDataRaw as OpenTelemetryDocument[];

export const AgentTracesTestPage = (): ReactElement => {
  const [, setSelectedSpanId] = useState<string | undefined>();

  const handleSelectionChange = (id: string | undefined) => {
    setSelectedSpanId(id);
    console.log(`Span selected: ${id}`);
  };

  return (
    <div className="p-8">
      <SandboxSection
        title="Agent Trace Visualization Examples"
        description="Different AI agent trace examples visualized using TreeView"
      >
        <SandboxItem title="Tavily Quotient Agent Trace" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={convertOTelDocumentToSpanCards(quoTavAgentData)}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="RAG Earnings Report Agent"
        description="Retrieval-augmented generation agent for earnings report analysis"
      >
        <SandboxItem title="Earnings Report Trace" pattern="grid">
          <TreeView
            expandButton="inside"
            spans={convertOTelDocumentToSpanCards(ragEarningsAgentData)}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="SMOL Deep Research Agent"
        description="Small, modular research agent trace visualization"
      >
        <SandboxItem title="Research Agent Trace" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={convertOTelDocumentToSpanCards(smolDeepResearchAgentData)}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>
      </SandboxSection>

      {/*{selectedSpanId && (*/}
      {/*  <SandboxSection*/}
      {/*    title="Selected Span Details"*/}
      {/*    description={`Currently selected span: ${selectedSpanId}`}*/}
      {/*  >*/}
      {/*    <SandboxItem title="Span Information">*/}
      {/*      <div className="rounded-lg bg-blue-50 p-4 text-sm">*/}
      {/*        <p>*/}
      {/*          Selected Span ID:{" "}*/}
      {/*          <code className="rounded bg-white px-2 py-1">*/}
      {/*            {selectedSpanId}*/}
      {/*          </code>*/}
      {/*        </p>*/}
      {/*        <p className="mt-2 text-gray-600">*/}
      {/*          This displays details for the selected span from the agent*/}
      {/*          traces. In a production environment, this would show detailed*/}
      {/*          span attributes, events, and links for AI agent debugging.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </SandboxItem>*/}
      {/*  </SandboxSection>*/}
      {/*)}*/}
    </div>
  );
};
