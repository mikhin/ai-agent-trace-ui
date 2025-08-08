import {
  convertOTelTraceToSpanTree,
  TreeView,
  type Span,
} from "ai-agent-trace-ui-core";
import { type ReactElement, useState } from "react";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";

// Mock Span objects that match the actual OpenTelemetry format
const createMockSpan = (data: Partial<Span>): Span => ({
  traceId: "trace-123",
  spanId: "span-123",
  name: "default-span",
  kind: "SPAN_KIND_INTERNAL",
  startTimeUnixNano: "1640995200000000000",
  endTimeUnixNano: "1640995202500000000",
  attributes: [],
  status: { code: "STATUS_CODE_OK" },
  flags: 1,
  events: [],
  links: [],
  droppedAttributesCount: 0,
  droppedEventsCount: 0,
  droppedLinksCount: 0,
  ...data,
});

// Complex nested AI application trace
const mockAIWorkflowSpans: Span[] = [
  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "root-agent",
    name: "ai_assistant.process_query",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995208500000000",
    attributes: [
      { key: "agent.name", value: { stringValue: "AI Research Assistant" } },
      {
        key: "query",
        value: {
          stringValue: "What are the latest developments in quantum computing?",
        },
      },
      { key: "user.id", value: { stringValue: "user-123" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "chain-understanding",
    parentSpanId: "root-agent",
    name: "query_understanding_chain",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995202100000000",
    attributes: [
      {
        key: "langchain.chain",
        value: { stringValue: "QueryUnderstandingChain" },
      },
      { key: "langchain.chain.type", value: { stringValue: "sequential" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "llm-query-analysis",
    parentSpanId: "chain-understanding",
    name: "openai.chat.completions",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995201800000000",
    attributes: [
      { key: "gen_ai.request.model", value: { stringValue: "gpt-4" } },
      { key: "gen_ai.usage.input_tokens", value: { intValue: "85" } },
      { key: "gen_ai.usage.output_tokens", value: { intValue: "45" } },
      { key: "gen_ai.usage.total_tokens", value: { intValue: "130" } },
      { key: "gen_ai.usage.cost", value: { intValue: "0.0052" } },
      { key: "gen_ai.request.temperature", value: { intValue: "0.3" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "vector-search",
    parentSpanId: "root-agent",
    name: "vector_search_retrieval",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995202100000000",
    endTimeUnixNano: "1640995203300000000",
    attributes: [
      { key: "db.operation.name", value: { stringValue: "similarity_search" } },
      { key: "db.collection.name", value: { stringValue: "research_papers" } },
      {
        key: "db.query.text",
        value: { stringValue: "quantum computing developments 2024" },
      },
      { key: "vector.top_k", value: { intValue: "5" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "chain-synthesis",
    parentSpanId: "root-agent",
    name: "content_synthesis_chain",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995203300000000",
    endTimeUnixNano: "1640995207100000000",
    attributes: [
      {
        key: "langchain.chain",
        value: { stringValue: "ContentSynthesisChain" },
      },
      { key: "retrieved_docs_count", value: { intValue: "5" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "llm-synthesis",
    parentSpanId: "chain-synthesis",
    name: "anthropic.messages.create",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995203300000000",
    endTimeUnixNano: "1640995206500000000",
    attributes: [
      {
        key: "gen_ai.request.model",
        value: { stringValue: "claude-3-sonnet" },
      },
      { key: "gen_ai.usage.input_tokens", value: { intValue: "1250" } },
      { key: "gen_ai.usage.output_tokens", value: { intValue: "380" } },
      { key: "gen_ai.usage.total_tokens", value: { intValue: "1630" } },
      { key: "gen_ai.usage.cost", value: { intValue: "0.0245" } },
      { key: "gen_ai.request.temperature", value: { intValue: "0.7" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-ai-workflow",
    spanId: "fact-checker",
    parentSpanId: "chain-synthesis",
    name: "fact_checking_tool",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995206500000000",
    endTimeUnixNano: "1640995207300000000",
    attributes: [
      { key: "function.name", value: { stringValue: "verify_claims" } },
      { key: "http.method", value: { stringValue: "POST" } },
      {
        key: "http.url",
        value: { stringValue: "https://api.factcheck.com/v1/verify" },
      },
      { key: "claims_checked", value: { intValue: "3" } },
    ],
  }),
];

// Multi-agent conversation trace
const mockMultiAgentSpans: Span[] = [
  createMockSpan({
    traceId: "trace-multi-agent",
    spanId: "conversation-root",
    name: "multi_agent_conversation",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995212000000000",
    attributes: [
      { key: "conversation.id", value: { stringValue: "conv-456" } },
      { key: "agents.count", value: { intValue: "3" } },
      {
        key: "conversation.topic",
        value: { stringValue: "Code review for React component" },
      },
    ],
  }),

  createMockSpan({
    traceId: "trace-multi-agent",
    spanId: "agent-architect",
    parentSpanId: "conversation-root",
    name: "architect_agent.analyze",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995204200000000",
    attributes: [
      { key: "agent.name", value: { stringValue: "Software Architect" } },
      { key: "agent.role", value: { stringValue: "architecture_review" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-multi-agent",
    spanId: "llm-architect-analysis",
    parentSpanId: "agent-architect",
    name: "openai.chat.completions",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995203800000000",
    attributes: [
      { key: "gen_ai.request.model", value: { stringValue: "gpt-4" } },
      { key: "gen_ai.usage.total_tokens", value: { intValue: "890" } },
      { key: "gen_ai.usage.cost", value: { intValue: "0.0178" } },
    ],
  }),

  createMockSpan({
    traceId: "trace-multi-agent",
    spanId: "agent-security",
    parentSpanId: "conversation-root",
    name: "security_agent.scan",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995204200000000",
    endTimeUnixNano: "1640995207000000000",
    attributes: [
      { key: "agent.name", value: { stringValue: "Security Specialist" } },
      { key: "agent.role", value: { stringValue: "security_audit" } },
      { key: "vulnerabilities_found", value: { intValue: "2" } },
    ],
    status: { code: "STATUS_CODE_ERROR" },
  }),

  createMockSpan({
    traceId: "trace-multi-agent",
    spanId: "agent-performance",
    parentSpanId: "conversation-root",
    name: "performance_agent.benchmark",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995207000000000",
    endTimeUnixNano: "1640995212100000000",
    attributes: [
      { key: "agent.name", value: { stringValue: "Performance Expert" } },
      { key: "agent.role", value: { stringValue: "performance_analysis" } },
      { key: "benchmark.score", value: { intValue: "85" } },
    ],
  }),
];

// Error handling and retry trace
const mockErrorRetrySpans: Span[] = [
  createMockSpan({
    traceId: "trace-error-retry",
    spanId: "retry-root",
    name: "llm_request_with_retry",
    kind: "SPAN_KIND_INTERNAL",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995208500000000",
    attributes: [
      { key: "retry.max_attempts", value: { intValue: "3" } },
      { key: "retry.final_attempt", value: { intValue: "3" } },
    ],
    status: { code: "STATUS_CODE_OK" },
  }),

  createMockSpan({
    traceId: "trace-error-retry",
    spanId: "llm-attempt-1",
    parentSpanId: "retry-root",
    name: "openai.chat.completions",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995200000000000",
    endTimeUnixNano: "1640995201000000000",
    attributes: [
      { key: "gen_ai.request.model", value: { stringValue: "gpt-4" } },
      { key: "retry.attempt", value: { intValue: "1" } },
      { key: "error.type", value: { stringValue: "rate_limit_exceeded" } },
    ],
    status: { code: "STATUS_CODE_ERROR" },
  }),

  createMockSpan({
    traceId: "trace-error-retry",
    spanId: "llm-attempt-2",
    parentSpanId: "retry-root",
    name: "openai.chat.completions",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995201000000000",
    endTimeUnixNano: "1640995203000000000",
    attributes: [
      { key: "gen_ai.request.model", value: { stringValue: "gpt-4" } },
      { key: "retry.attempt", value: { intValue: "2" } },
      { key: "error.type", value: { stringValue: "timeout" } },
    ],
    status: { code: "STATUS_CODE_ERROR" },
  }),
  createMockSpan({
    traceId: "trace-error-retry",
    spanId: "llm-attempt-3",
    parentSpanId: "retry-root",
    name: "openai.chat.completions",
    kind: "SPAN_KIND_CLIENT",
    startTimeUnixNano: "1640995203000000000",
    endTimeUnixNano: "1640995206200000000",
    attributes: [
      { key: "gen_ai.request.model", value: { stringValue: "gpt-4" } },
      { key: "gen_ai.usage.total_tokens", value: { intValue: "420" } },
      { key: "gen_ai.usage.cost", value: { intValue: "0.0084" } },
      { key: "retry.attempt", value: { intValue: "3" } },
    ],
    status: { code: "STATUS_CODE_OK" },
  }),
];

// Convert all mock data to SpanCard format
const aiWorkflowSpans = convertOTelTraceToSpanTree(mockAIWorkflowSpans);
const multiAgentSpans = convertOTelTraceToSpanTree(mockMultiAgentSpans);
const errorRetrySpans = convertOTelTraceToSpanTree(mockErrorRetrySpans);

// Combined traces for comprehensive view
const allTraces = [...aiWorkflowSpans, ...multiAgentSpans, ...errorRetrySpans];

export const OpenTelemetryAdaptersPage = (): ReactElement => {
  const [, setSelectedSpanId] = useState<string | undefined>();

  const handleSelectionChange = (id: string | undefined) => {
    setSelectedSpanId(id);
    console.log(`OpenTelemetry Span selected: ${id}`);
  };

  return (
    <div className="p-8">
      <SandboxSection
        title="OpenTelemetry AI Workflow Traces"
        description="Complex AI application traces converted from Span format using TreeView component for hierarchical visualization"
      >
        <SandboxItem title="AI Research Assistant Workflow" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={aiWorkflowSpans}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>

        <SandboxItem
          title="Multi-Agent Code Review Conversation"
          pattern="grid"
        >
          <TreeView
            expandButton="inside"
            spans={multiAgentSpans}
            initialSelectedId="agent-security"
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>

        <SandboxItem title="LLM Request with Retry Logic" pattern="dots">
          <TreeView
            expandButton="inside"
            spans={errorRetrySpans}
            onSelectionChange={handleSelectionChange}
          />
        </SandboxItem>
      </SandboxSection>

      <SandboxSection
        title="OpenTelemetry Trace Analysis"
        description="Real-world patterns in LLM application observability using OpenTelemetry spans"
      >
        <SandboxItem title="All Traces Combined View" pattern="grid">
          <TreeView
            expandButton="inside"
            spans={allTraces}
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
      {/*          This demonstrates real-time span selection from OpenTelemetry*/}
      {/*          traces. In a real application, this would show detailed span*/}
      {/*          attributes, events, and links.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </SandboxItem>*/}
      {/*  </SandboxSection>*/}
      {/*)}*/}
    </div>
  );
};
