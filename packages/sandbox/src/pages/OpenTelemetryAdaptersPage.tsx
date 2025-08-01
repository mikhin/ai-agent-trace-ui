import {
  convertOTelTraceToSpanTree,
  type ReadableSpan,
  TreeView,
  SpanKind,
  SpanStatusCode,
} from "ai-agent-trace-ui-core";
import { type ReactElement, useState } from "react";

import { SandboxItem } from "../components/SandboxItem.tsx";
import { SandboxSection } from "../components/SandboxSection";

// Mock ReadableSpan objects that match the actual OpenTelemetry format
const createMockReadableSpan = (data: Partial<ReadableSpan>): ReadableSpan => ({
  name: "default-span",
  kind: SpanKind.INTERNAL,
  spanContext: () => ({
    traceId: "trace-123",
    spanId: "span-123",
    traceFlags: 1,
    isRemote: false,
  }),
  startTime: [1640995200, 0] as const,
  endTime: [1640995202, 500000000] as const,
  duration: [2, 500000000] as const,
  status: { code: SpanStatusCode.OK },
  attributes: {},
  links: [],
  events: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource: {} as any,
  instrumentationScope: { name: "test", version: "1.0.0" },
  ended: true,
  droppedAttributesCount: 0,
  droppedEventsCount: 0,
  droppedLinksCount: 0,
  parentSpanContext: undefined,
  ...data,
});

// Complex nested AI application trace
const mockAIWorkflowSpans: ReadableSpan[] = [
  createMockReadableSpan({
    name: "ai_assistant.process_query",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "root-agent",
      traceFlags: 1,
      isRemote: false,
    }),
    duration: [8, 500000000] as const,
    attributes: {
      "agent.name": "AI Research Assistant",
      query: "What are the latest developments in quantum computing?",
      "user.id": "user-123",
    },
  }),

  createMockReadableSpan({
    name: "query_understanding_chain",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "chain-understanding",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-nested",
      spanId: "root-agent",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [2, 100000000] as const,
    attributes: {
      "langchain.chain": "QueryUnderstandingChain",
      "langchain.chain.type": "sequential",
    },
  }),

  createMockReadableSpan({
    name: "openai.chat.completions",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "llm-query-analysis",
      traceFlags: 1,
      isRemote: false,
    }),
    duration: [1, 800000000] as const,
    attributes: {
      "gen_ai.request.model": "gpt-4",
      "gen_ai.usage.input_tokens": 85,
      "gen_ai.usage.output_tokens": 45,
      "gen_ai.usage.total_tokens": 130,
      "gen_ai.usage.cost": 0.0052,
      "gen_ai.request.temperature": 0.3,
    },
  }),

  createMockReadableSpan({
    name: "vector_search_retrieval",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "vector-search",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-nested",
      spanId: "root-agent",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [1, 200000000] as const,
    attributes: {
      "db.operation.name": "similarity_search",
      "db.collection.name": "research_papers",
      "db.query.text": "quantum computing developments 2024",
      "vector.top_k": 5,
    },
  }),

  createMockReadableSpan({
    name: "content_synthesis_chain",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "chain-synthesis",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-ai-workflow",
      spanId: "root-agent",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [3, 800000000] as const,
    attributes: {
      "langchain.chain": "ContentSynthesisChain",
      retrieved_docs_count: 5,
    },
  }),

  createMockReadableSpan({
    name: "anthropic.messages.create",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "llm-synthesis",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-ai-workflow",
      spanId: "chain-synthesis",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [3, 200000000] as const,
    attributes: {
      "gen_ai.request.model": "claude-3-sonnet",
      "gen_ai.usage.input_tokens": 1250,
      "gen_ai.usage.output_tokens": 380,
      "gen_ai.usage.total_tokens": 1630,
      "gen_ai.usage.cost": 0.0245,
      "gen_ai.request.temperature": 0.7,
    },
  }),

  createMockReadableSpan({
    name: "fact_checking_tool",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-ai-workflow",
      spanId: "fact-checker",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-ai-workflow",
      spanId: "chain-synthesis",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [0, 800000000] as const,
    attributes: {
      "function.name": "verify_claims",
      "http.method": "POST",
      "http.url": "https://api.factcheck.com/v1/verify",
      claims_checked: 3,
    },
  }),
];

// Multi-agent conversation trace
const mockMultiAgentSpans: ReadableSpan[] = [
  createMockReadableSpan({
    name: "multi_agent_conversation",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-multi-agent",
      spanId: "conversation-root",
      traceFlags: 1,
      isRemote: false,
    }),
    duration: [12, 0] as const,
    attributes: {
      "conversation.id": "conv-456",
      "agents.count": 3,
      "conversation.topic": "Code review for React component",
    },
  }),

  createMockReadableSpan({
    name: "architect_agent.analyze",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-multi-agent",
      spanId: "agent-architect",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-multi-agent",
      spanId: "conversation-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [4, 200000000] as const,
    attributes: {
      "agent.name": "Software Architect",
      "agent.role": "architecture_review",
    },
  }),

  createMockReadableSpan({
    name: "openai.chat.completions",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-multi-agent",
      spanId: "llm-architect-analysis",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-multi-agent",
      spanId: "agent-architect",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [3, 800000000] as const,
    attributes: {
      "gen_ai.request.model": "gpt-4",
      "gen_ai.usage.total_tokens": 890,
      "gen_ai.usage.cost": 0.0178,
    },
  }),

  createMockReadableSpan({
    name: "security_agent.scan",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-multi-agent",
      spanId: "agent-security",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-multi-agent",
      spanId: "conversation-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [2, 800000000] as const,
    attributes: {
      "agent.name": "Security Specialist",
      "agent.role": "security_audit",
      vulnerabilities_found: 2,
    },
    status: { code: SpanStatusCode.ERROR },
  }),

  createMockReadableSpan({
    name: "performance_agent.benchmark",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-multi-agent",
      spanId: "agent-performance",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-multi-agent",
      spanId: "conversation-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [5, 100000000] as const,
    attributes: {
      "agent.name": "Performance Expert",
      "agent.role": "performance_analysis",
      "benchmark.score": 85,
    },
  }),
];

// Error handling and retry trace
const mockErrorRetrySpans: ReadableSpan[] = [
  createMockReadableSpan({
    name: "llm_request_with_retry",
    kind: SpanKind.INTERNAL,
    spanContext: () => ({
      traceId: "trace-error-retry",
      spanId: "retry-root",
      traceFlags: 1,
      isRemote: false,
    }),
    duration: [8, 500000000] as const,
    attributes: {
      "retry.max_attempts": 3,
      "retry.final_attempt": 3,
    },
    status: { code: SpanStatusCode.OK },
  }),

  createMockReadableSpan({
    name: "openai.chat.completions",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-error-retry",
      spanId: "llm-attempt-1",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-error-retry",
      spanId: "retry-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [1, 0] as const,
    attributes: {
      "gen_ai.request.model": "gpt-4",
      "retry.attempt": 1,
      "error.type": "rate_limit_exceeded",
    },
    status: { code: SpanStatusCode.ERROR },
  }),

  createMockReadableSpan({
    name: "openai.chat.completions",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-error-retry",
      spanId: "llm-attempt-2",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-error-retry",
      spanId: "retry-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [2, 0] as const,
    attributes: {
      "gen_ai.request.model": "gpt-4",
      "retry.attempt": 2,
      "error.type": "timeout",
    },
    status: { code: SpanStatusCode.ERROR },
  }),
  createMockReadableSpan({
    name: "openai.chat.completions",
    kind: SpanKind.CLIENT,
    spanContext: () => ({
      traceId: "trace-error-retry",
      spanId: "llm-attempt-3",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: {
      traceId: "trace-error-retry",
      spanId: "retry-root",
      traceFlags: 1,
      isRemote: false,
    },
    duration: [3, 200000000] as const,
    attributes: {
      "gen_ai.request.model": "gpt-4",
      "gen_ai.usage.total_tokens": 420,
      "gen_ai.usage.cost": 0.0084,
      "retry.attempt": 3,
    },
    status: { code: SpanStatusCode.OK },
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
        description="Complex AI application traces converted from ReadableSpan format using TreeView component for hierarchical visualization"
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
            expandButton="outside"
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
            expandButton="outside"
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
