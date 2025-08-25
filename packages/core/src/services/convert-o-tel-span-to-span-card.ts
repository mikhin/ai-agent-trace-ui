import type { TraceSpan } from "../types";
import type { Span } from "../types/open-telemetry";

import { determineSpanCategory } from "../services/determine-span-category.ts";
import { calculateDuration } from "./calculate-duration";
import { convertTimestamp } from "./convert-timestamp";
import { extractCost } from "./extract-cost";
import { extractTokenCount } from "./extract-token-count";
import { generateTitle } from "./generate-title";
import { mapSpanStatus } from "./map-span-status";

export const convertOTelSpanToSpanCard = (
  span: Span,
  children: TraceSpan[] = [],
): TraceSpan => {
  const duration = calculateDuration(span);
  const status = mapSpanStatus(span.status.code);
  const spanType = determineSpanCategory(span);
  const tokensCount = extractTokenCount(span);
  const cost = extractCost(span);

  return {
    id: span.spanId,
    title: generateTitle(span),
    type: spanType,
    status,
    attributes: span.attributes,
    duration,
    tokensCount,
    raw: JSON.stringify(span, null, 2),
    cost,
    startTime: convertTimestamp(span.startTimeUnixNano),
    endTime: convertTimestamp(span.endTimeUnixNano),
    children,
  };
};
