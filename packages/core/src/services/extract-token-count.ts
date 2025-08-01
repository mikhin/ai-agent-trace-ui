import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import { LLM_ATTRIBUTES } from "../constants.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const extractTokenCount = (span: ReadableSpan): number => {
  const totalTokens = getAttributeValue(span, LLM_ATTRIBUTES.TOKENS_TOTAL);
  const inputTokens = getAttributeValue(span, LLM_ATTRIBUTES.TOKENS_INPUT);
  const outputTokens = getAttributeValue(span, LLM_ATTRIBUTES.TOKENS_OUTPUT);

  if (typeof totalTokens === "number") {
    return totalTokens;
  }

  const input = typeof inputTokens === "number" ? inputTokens : 0;
  const output = typeof outputTokens === "number" ? outputTokens : 0;

  return input + output;
};
