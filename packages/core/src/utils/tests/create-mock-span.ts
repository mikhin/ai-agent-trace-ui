import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import { SpanKind, SpanStatusCode } from "@opentelemetry/api";

interface MockSpanOptions {
  name?: string;
  duration?: [number, number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
  status?: { code: SpanStatusCode; message?: string };
  kind?: SpanKind;
}

/**
 * Creates a mock ReadableSpan for testing.
 */
export const createMockSpan = (options: MockSpanOptions = {}): ReadableSpan => {
  const {
    name = "test-span",
    duration = [2, 0],
    attributes = {},
    status = { code: SpanStatusCode.OK },
    kind = SpanKind.INTERNAL,
  } = options;

  return {
    name,
    kind,
    spanContext: () => ({
      traceId: "test-trace-id",
      spanId: "test-span-id",
      traceFlags: 1,
      isRemote: false,
    }),
    parentSpanContext: undefined,
    startTime: [1640995200, 0] as const,
    endTime: [1640995200 + duration[0], duration[1]] as const,
    duration,
    status,
    attributes,
    links: [],
    events: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: {} as any,
    instrumentationScope: { name: "test", version: "1.0.0" },
    ended: true,
    droppedAttributesCount: 0,
    droppedEventsCount: 0,
    droppedLinksCount: 0,
  };
};
