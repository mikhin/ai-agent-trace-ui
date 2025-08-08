import type { Span } from "../types/open-telemetry";

export const calculateDuration = (span: Span): number => {
  // Convert string nanosecond timestamps to BigInt for precise arithmetic
  const startNano = BigInt(span.startTimeUnixNano);
  const endNano = BigInt(span.endTimeUnixNano);

  // Calculate duration in nanoseconds
  const durationNano = endNano - startNano;

  // Divide by 1_000_000 to get milliseconds
  return Number(durationNano / BigInt(1_000_000));
};

export const formatDuration = (durationMs: number): string => {
  if (durationMs < 1000) return `${Math.round(durationMs)}ms`;
  if (durationMs < 60000) return `${Math.round(durationMs / 1000)}s`;
  if (durationMs < 3600000) {
    const m = Math.floor(durationMs / 60000);
    const s = Math.floor((durationMs % 60000) / 1000);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(durationMs / 3600000);
  const m = Math.floor((durationMs % 3600000) / 60000);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};
