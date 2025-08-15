export type SpanStatus = "success" | "error" | "pending" | "warning";

export type SpanCardType = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  cost: number;
  type: SpanCategory;
  children?: SpanCardType[];
  tokensCount: number;
  status: SpanStatus;
};

export type SpanCategory =
  | "llm_call"
  | "tool_execution"
  | "agent_invocation"
  | "chain_operation"
  | "retrieval"
  | "embedding"
  | "create_agent"
  | "unknown";
