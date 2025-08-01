import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import type { Span } from "../types/span.ts";

import { convertOTelSpanToSpanCard } from "./convert-o-tel-span-to-span-card.ts";

export const convertOTelTraceToSpanTree = (spans: ReadableSpan[]): Span[] => {
  const spanMap = new Map<string, Span>();
  const rootSpans: Span[] = [];

  // First pass: create all span objects
  spans.forEach((span) => {
    const convertedSpan = convertOTelSpanToSpanCard(span);
    spanMap.set(convertedSpan.id, convertedSpan);
  });

  // Second pass: build parent-child relationships
  spans.forEach((span) => {
    const convertedSpan = spanMap.get(span.spanContext().spanId)!;
    const parentSpanId = span.parentSpanContext?.spanId;

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
