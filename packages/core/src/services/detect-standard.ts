import type { Span } from "../types/open-telemetry.ts";

import {
  OPENINFERENCE_ATTRIBUTES,
  OPENTELEMETRY_GENAI_ATTRIBUTES,
} from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

/**
 * Detect which OpenTelemetry standard is being used
 */
export function detectStandard(
  span: Span,
): "opentelemetry_genai" | "openinference" | "standard" {
  // Check for OpenTelemetry GenAI attributes
  if (
    getAttributeValue(span, OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME) ||
    getAttributeValue(span, OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM)
  ) {
    return "opentelemetry_genai";
  }

  // Check for OpenInference attributes
  if (
    getAttributeValue(span, OPENINFERENCE_ATTRIBUTES.SPAN_KIND) ||
    getAttributeValue(span, OPENINFERENCE_ATTRIBUTES.LLM_MODEL)
  ) {
    return "openinference";
  }

  // Default to standard OpenTelemetry
  return "standard";
}
