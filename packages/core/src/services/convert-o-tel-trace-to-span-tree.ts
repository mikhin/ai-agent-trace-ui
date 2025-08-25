import type { TraceSpan } from "../types";
import type { Span } from "../types/open-telemetry";

import { convertOTelSpanToSpanCard } from "./convert-o-tel-span-to-span-card.ts";

export const convertOTelTraceToSpanTree = (spans: Span[]): TraceSpan[] => {
  const spanMap = new Map<string, TraceSpan>();
  const rootSpans: TraceSpan[] = [];

  // First pass: create all span objects
  spans.forEach((span) => {
    const convertedSpan = convertOTelSpanToSpanCard(span);
    spanMap.set(convertedSpan.id, convertedSpan);
  });

  // Second pass: build parent-child relationships
  spans.forEach((span) => {
    const convertedSpan = spanMap.get(span.spanId)!;
    const parentSpanId = span.parentSpanId;

    if (parentSpanId) {
      const parent = spanMap.get(parentSpanId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(convertedSpan);
      }
    } else {
      rootSpans.push(convertedSpan);
    }
  });

  return rootSpans;
};
