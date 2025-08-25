import type { TraceSpanCategory } from "../types";
import type { Span } from "../types/open-telemetry.ts";

import { detectStandardOpenTelemetry } from "./detect-standard-open-telemetry.ts";

/**
 * Categorize span using standard OpenTelemetry attributes and heuristics
 */
export const categorizeStandardOpenTelemetry = (
  span: Span,
): TraceSpanCategory => {
  const mappings = detectStandardOpenTelemetry;

  // Priority order for detection
  if (mappings.isLLMCall(span)) return "llm_call";
  if (mappings.isAgentOperation(span)) return "agent_invocation";
  if (mappings.isChainOperation(span)) return "chain_operation";
  if (mappings.isRetrievalOperation(span)) return "retrieval";
  if (mappings.isFunctionCall(span)) return "tool_execution";
  if (mappings.isHttpCall(span)) return "tool_execution";
  if (mappings.isDatabaseCall(span)) return "tool_execution";

  return "unknown";
};
