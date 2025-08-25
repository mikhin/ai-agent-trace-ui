import type { TraceSpanCategory } from "../types";
import type { Span } from "../types/open-telemetry.ts";

import {
  OPENINFERENCE_ATTRIBUTES,
  OPENINFERENCE_MAPPINGS,
} from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

/**
 * Categorize span using OpenInference semantic conventions
 */
export function categorizeOpenInference(span: Span): TraceSpanCategory {
  const spanKind = getAttributeValue(span, OPENINFERENCE_ATTRIBUTES.SPAN_KIND);

  if (typeof spanKind === "string") {
    const category = OPENINFERENCE_MAPPINGS[spanKind];

    if (category) return category;
  }

  return "unknown";
}
