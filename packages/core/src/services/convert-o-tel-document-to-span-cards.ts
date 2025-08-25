import type { TraceSpan } from "../types";
import type { OpenTelemetryDocument, Span } from "../types/open-telemetry";

import { convertOTelTraceToSpanTree } from "./convert-o-tel-trace-to-span-tree";

export const convertOTelDocumentToSpanCards = (
  documents: OpenTelemetryDocument | OpenTelemetryDocument[],
): TraceSpan[] => {
  // Handle both single document and array of documents
  const docArray = Array.isArray(documents) ? documents : [documents];

  // Extract all spans from all documents, resource spans and scope spans
  const allSpans: Span[] = [];

  docArray.forEach((document) => {
    document.resourceSpans.forEach((resourceSpan) => {
      resourceSpan.scopeSpans.forEach((scopeSpan) => {
        allSpans.push(...scopeSpan.spans);
      });
    });
  });

  // Convert the flat array of spans to a tree structure
  return convertOTelTraceToSpanTree(allSpans);
};
