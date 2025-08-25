import type { SpanAttribute } from "./open-telemetry";

export type TraceRecord = {
  id: string;
  name: string;
  spansCount: number;
  durationMs: number;
  agentDescription: string;
};

export type TraceSpanStatus = "success" | "error" | "pending" | "warning";

export type TraceSpan = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  cost: number;
  type: TraceSpanCategory;
  raw: string;
  attributes: SpanAttribute[];
  children?: TraceSpan[];
  tokensCount: number;
  status: TraceSpanStatus;
};

export type TraceSpanCategory =
  | "llm_call"
  | "tool_execution"
  | "agent_invocation"
  | "chain_operation"
  | "retrieval"
  | "embedding"
  | "create_agent"
  | "unknown";

export type ColorVariant =
  | "purple"
  | "indigo"
  | "orange"
  | "teal"
  | "cyan"
  | "sky"
  | "yellow"
  | "emerald"
  | "red"
  | "gray";
