import type { Span } from "../types/open-telemetry";

import { OPENTELEMETRY_GENAI_ATTRIBUTES } from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const extractCost = (span: Span): number => {
  const cost =
    getAttributeValue(span, OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_INPUT_COST) ||
    getAttributeValue(span, OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_OUTPUT_COST) ||
    getAttributeValue(span, "gen_ai.usage.cost"); // fallback

  return typeof cost === "number" ? cost : 0;
};
