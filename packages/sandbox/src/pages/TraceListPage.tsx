import { TraceList, type TraceRecord } from "ai-agent-trace-ui-core";
import { useState, type ReactElement } from "react";

import { SandboxItem } from "../components/SandboxItem";
import { SandboxSection } from "../components/SandboxSection";

const traces: TraceRecord[] = [
  {
    id: "1",
    name: "Trace 1",
    spansCount: 10,
    durationMs: 10_000,
    agentDescription: "research-agent",
    // badges: [
    //   {
    //     children: "app:dev-chatbot",
    //     theme: "indigo",
    //   },
    //   {
    //     children: "end:dev",
    //     theme: "emerald",
    //   },
    //   {
    //     children: "gpt-4",
    //     theme: "purple",
    //   },
    //   {
    //     children: "5 tools",
    //     theme: "orange",
    //   },
    // ],
  },

  {
    id: "2",
    name: "Trace 2",
    spansCount: 100,
    durationMs: 100_000,
    agentDescription: "data-analysis-bot",
    // badges: [
    //   {
    //     children: "app: staging-assistant",
    //     theme: "indigo",
    //   },
    //   {
    //     children: "end: staging",
    //     theme: "emerald",
    //   },
    //   {
    //     children: "claude-3.5-sonnet",
    //     theme: "purple",
    //   },
    //   {
    //     children: "10 tools",
    //     theme: "orange",
    //   },
    // ],
  },

  {
    id: "3",
    name: "Trace 3",
    spansCount: 250,
    durationMs: 1_000,
    agentDescription: "customer-support-ai",
    // badges: [
    //   {
    //     children: "app: prod-analyzer",
    //     theme: "indigo",
    //   },
    //   {
    //     children: "end: prod",
    //     theme: "emerald",
    //   },
    //   {
    //     children: "gpt-4-turbo",
    //     theme: "purple",
    //   },
    // ],
  },
];

export const TraceListPage = (): ReactElement => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="p-8">
      <SandboxSection
        title="Trace List Component"
        description="A list of traces with a toggle to expand/collapse the list."
      >
        <SandboxItem
          title="Default view"
          pattern="none"
          className="bg-white dark:bg-gray-900"
        >
          <TraceList
            traces={traces}
            expanded={expanded}
            onExpandStateChange={setExpanded}
          />
        </SandboxItem>
      </SandboxSection>
    </div>
  );
};
