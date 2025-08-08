import type { Span } from "../types/open-telemetry";

import { OPENTELEMETRY_GENAI_ATTRIBUTES } from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const extractTokenCount = (span: Span): number => {
  const totalTokens = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_TOTAL_TOKENS,
  );
  const inputTokens = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_INPUT_TOKENS,
  );
  const outputTokens = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_OUTPUT_TOKENS,
  );

  if (typeof totalTokens === "number") {
    return totalTokens;
  }

  const input = typeof inputTokens === "number" ? inputTokens : 0;
  const output = typeof outputTokens === "number" ? outputTokens : 0;

  return input + output;
};
