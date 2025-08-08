import type { Span } from "../types/open-telemetry";
import type { SpanCardType } from "../types/span";

import { determineSpanCategory } from "../services/determine-span-category.ts";
import { calculateDuration } from "./calculate-duration";
import { convertTimestamp } from "./convert-timestamp";
import { extractCost } from "./extract-cost";
import { extractTokenCount } from "./extract-token-count";
import { generateTitle } from "./generate-title";
import { mapSpanStatus } from "./map-span-status";

export const convertOTelSpanToSpanCard = (
  span: Span,
  children: SpanCardType[] = [],
): SpanCardType => {
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
    duration,
    tokensCount,
    cost,
    startTime: convertTimestamp(span.startTimeUnixNano),
    endTime: convertTimestamp(span.endTimeUnixNano),
    children,
  };
};
