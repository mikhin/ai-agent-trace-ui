import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

export const calculateDuration = (span: ReadableSpan): number => {
  const durationHrTime = span.duration;
  // Convert HrTime [seconds, nanoseconds] to milliseconds
  return durationHrTime[0] * 1000 + durationHrTime[1] / 1_000_000;
};
