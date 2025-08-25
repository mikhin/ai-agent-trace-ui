import type { TraceSpanCategory } from "../types";
import type { Span } from "../types/open-telemetry.ts";

import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  OPENTELEMETRY_GENAI_MAPPINGS,
} from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

/**
 * Categorize span using OpenTelemetry GenAI semantic conventions
 */
export function categorizeOpenTelemetryGenAI(span: Span): TraceSpanCategory {
  const operationName = getAttributeValue(
    span,
    OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME,
  );

  if (typeof operationName === "string") {
    const category = OPENTELEMETRY_GENAI_MAPPINGS[operationName];

    if (category) return category;
  }

  return "unknown";
}
