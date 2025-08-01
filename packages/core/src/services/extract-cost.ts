import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import { LLM_ATTRIBUTES } from "../constants.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const extractCost = (span: ReadableSpan): number => {
  const cost = getAttributeValue(span, LLM_ATTRIBUTES.COST);

  return typeof cost === "number" ? cost : 0;
};
