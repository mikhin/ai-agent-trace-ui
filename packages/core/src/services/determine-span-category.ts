import type { TraceSpanCategory } from "../types";
import type { Span } from "../types/open-telemetry.ts";

import { categorizeOpenInference } from "../services/categorize-open-inference.ts";
import { categorizeOpenTelemetryGenAI } from "../services/categorize-open-telemetry-gen-ai.ts";
import { detectStandard } from "../services/detect-standard.ts";
import { categorizeStandardOpenTelemetry } from "./categorize-standard-open-telemetry.ts";

/**
 * Main function to determine span category across all standards
 * Priority: OpenTelemetry GenAI > OpenInference > Standard OpenTelemetry
 */
export function determineSpanCategory(span: Span): TraceSpanCategory {
  const standard = detectStandard(span);

  switch (standard) {
    case "opentelemetry_genai": {
      const category = categorizeOpenTelemetryGenAI(span);
      return category !== "unknown"
        ? category
        : categorizeStandardOpenTelemetry(span);
    }

    case "openinference": {
      const category = categorizeOpenInference(span);
      return category !== "unknown"
        ? category
        : categorizeStandardOpenTelemetry(span);
    }

    case "standard":
    default: {
      return categorizeStandardOpenTelemetry(span);
    }
  }
}
