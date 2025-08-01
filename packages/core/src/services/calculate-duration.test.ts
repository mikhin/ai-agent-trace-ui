import { describe, it, expect } from "vitest";

import { createMockSpan } from "../utils/tests/create-mock-span";
import { calculateDuration } from "./calculate-duration";

describe("calculateDuration", () => {
  describe("basic duration calculations", () => {
    it("should convert seconds to milliseconds", () => {
      const span = createMockSpan({ duration: [2, 0] }); // 2 seconds, 0 nanoseconds

      const result = calculateDuration(span);

      expect(result).toBe(2000); // 2000 milliseconds
    });

    it("should convert nanoseconds to milliseconds", () => {
      const span = createMockSpan({ duration: [0, 500_000_000] }); // 0 seconds, 500 million nanoseconds (0.5 seconds)

      const result = calculateDuration(span);

      expect(result).toBe(500); // 500 milliseconds
    });

    it("should combine seconds and nanoseconds", () => {
      const span = createMockSpan({ duration: [2, 500_000_000] }); // 2.5 seconds total

      const result = calculateDuration(span);

      expect(result).toBe(2500); // 2500 milliseconds
    });

    it("should handle zero duration", () => {
      const span = createMockSpan({ duration: [0, 0] }); // No duration

      const result = calculateDuration(span);

      expect(result).toBe(0);
    });
  });

  describe("small duration values", () => {
    it("should handle microseconds", () => {
      const span = createMockSpan({ duration: [0, 1_000] }); // 1 microsecond = 1000 nanoseconds

      const result = calculateDuration(span);

      expect(result).toBe(0.001); // 0.001 milliseconds
    });

    it("should handle single nanosecond", () => {
      const span = createMockSpan({ duration: [0, 1] }); // 1 nanosecond

      const result = calculateDuration(span);

      expect(result).toBe(0.000001); // 0.000001 milliseconds
    });

    it("should handle sub-millisecond durations", () => {
      const span = createMockSpan({ duration: [0, 100_000] }); // 100,000 nanoseconds = 0.1 milliseconds

      const result = calculateDuration(span);

      expect(result).toBe(0.1);
    });

    it("should handle fractional milliseconds", () => {
      const span = createMockSpan({ duration: [0, 1_500_000] }); // 1.5 milliseconds in nanoseconds

      const result = calculateDuration(span);

      expect(result).toBe(1.5);
    });
  });

  describe("large duration values", () => {
    it("should handle minutes", () => {
      const span = createMockSpan({ duration: [60, 0] }); // 1 minute

      const result = calculateDuration(span);

      expect(result).toBe(60_000); // 60,000 milliseconds
    });

    it("should handle hours", () => {
      const span = createMockSpan({ duration: [3600, 0] }); // 1 hour

      const result = calculateDuration(span);

      expect(result).toBe(3_600_000); // 3.6 million milliseconds
    });

    it("should handle very large durations", () => {
      const span = createMockSpan({ duration: [86400, 0] }); // 24 hours (1 day)

      const result = calculateDuration(span);

      expect(result).toBe(86_400_000);
    });

    it("should handle mixed large values", () => {
      const span = createMockSpan({ duration: [3661, 500_000_000] }); // 1 hour, 1 minute, 1.5 seconds

      const result = calculateDuration(span);

      expect(result).toBe(3_661_500); // Total in milliseconds
    });
  });

  describe("precision and rounding", () => {
    it("should maintain precision for exact millisecond values", () => {
      const span = createMockSpan({ duration: [1, 234_000_000] }); // 1.234 seconds

      const result = calculateDuration(span);

      expect(result).toBe(1234);
    });

    it("should handle floating point precision", () => {
      const span = createMockSpan({ duration: [0, 333_333] }); // Should result in 0.333333 milliseconds

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(0.333333, 6);
    });

    it("should handle repeating decimal nanoseconds", () => {
      const span = createMockSpan({ duration: [0, 666_667] }); // Should result in ~0.666667 milliseconds

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(0.666667, 6);
    });

    it("should handle very precise nanosecond values", () => {
      const span = createMockSpan({ duration: [0, 123_456_789] }); // 123.456789 milliseconds

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(123.456789, 6);
    });
  });

  describe("edge cases", () => {
    it("should handle maximum safe integer seconds", () => {
      const maxSafeSeconds = Math.floor(Number.MAX_SAFE_INTEGER / 1000);
      const span = createMockSpan({ duration: [maxSafeSeconds, 0] });

      const result = calculateDuration(span);

      expect(result).toBe(maxSafeSeconds * 1000);
      expect(Number.isSafeInteger(result)).toBe(true);
    });

    it("should handle maximum nanoseconds (999,999,999)", () => {
      const span = createMockSpan({ duration: [0, 999_999_999] }); // Just under 1 second

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(999.999999, 6);
    });

    it("should handle large seconds with large nanoseconds", () => {
      const span = createMockSpan({ duration: [1000, 999_999_999] }); // 1000.999999999 seconds

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(1_000_999.999999, 6);
    });
  });

  describe("real-world LLM scenarios", () => {
    it("should handle typical OpenAI API call duration", () => {
      const span = createMockSpan({ duration: [2, 150_000_000] }); // 2.15 seconds

      const result = calculateDuration(span);

      expect(result).toBe(2150);
    });

    it("should handle fast local model inference", () => {
      const span = createMockSpan({ duration: [0, 50_000_000] }); // 50 milliseconds

      const result = calculateDuration(span);

      expect(result).toBe(50);
    });

    it("should handle slow complex reasoning", () => {
      const span = createMockSpan({ duration: [15, 750_000_000] }); // 15.75 seconds

      const result = calculateDuration(span);

      expect(result).toBe(15_750);
    });

    it("should handle vector database query", () => {
      const span = createMockSpan({ duration: [0, 125_000_000] }); // 125 milliseconds

      const result = calculateDuration(span);

      expect(result).toBe(125);
    });

    it("should handle agent workflow with multiple steps", () => {
      const span = createMockSpan({ duration: [8, 250_000_000] }); // 8.25 seconds

      const result = calculateDuration(span);

      expect(result).toBe(8250);
    });

    it("should handle very fast tool calls", () => {
      const span = createMockSpan({ duration: [0, 1_000_000] }); // 1 millisecond

      const result = calculateDuration(span);

      expect(result).toBe(1);
    });

    it("should handle timeout scenarios", () => {
      const span = createMockSpan({ duration: [30, 0] }); // 30 second timeout

      const result = calculateDuration(span);

      expect(result).toBe(30_000);
    });

    it("should handle streaming response duration", () => {
      const span = createMockSpan({ duration: [12, 500_000_000] }); // 12.5 seconds streaming

      const result = calculateDuration(span);

      expect(result).toBe(12_500);
    });
  });

  describe("batch processing scenarios", () => {
    it("should handle batch LLM processing", () => {
      const span = createMockSpan({ duration: [45, 250_000_000] }); // 45.25 seconds for batch

      const result = calculateDuration(span);

      expect(result).toBe(45_250);
    });

    it("should handle parallel processing completion", () => {
      const span = createMockSpan({ duration: [3, 800_000_000] }); // 3.8 seconds parallel execution

      const result = calculateDuration(span);

      expect(result).toBe(3800);
    });

    it("should handle retry with backoff total duration", () => {
      const span = createMockSpan({ duration: [7, 125_000_000] }); // 7.125 seconds with retries

      const result = calculateDuration(span);

      expect(result).toBe(7125);
    });
  });

  describe("performance and benchmarking", () => {
    it("should handle micro-benchmark durations", () => {
      const span = createMockSpan({ duration: [0, 500] }); // 500 nanoseconds

      const result = calculateDuration(span);

      expect(result).toBe(0.0005);
    });

    it("should handle high-precision timing", () => {
      const span = createMockSpan({ duration: [0, 1_234_567] }); // 1.234567 milliseconds

      const result = calculateDuration(span);

      expect(result).toBeCloseTo(1.234567, 6);
    });

    it("should handle performance regression test durations", () => {
      const span = createMockSpan({ duration: [0, 999_000] }); // 0.999 milliseconds

      const result = calculateDuration(span);

      expect(result).toBe(0.999);
    });
  });

  describe("mathematical correctness", () => {
    it("should correctly convert 1 second to 1000 milliseconds", () => {
      const span = createMockSpan({ duration: [1, 0] });

      const result = calculateDuration(span);

      expect(result).toBe(1000);
    });

    it("should correctly convert 1 billion nanoseconds to 1000 milliseconds", () => {
      const span = createMockSpan({ duration: [0, 1_000_000_000] });

      const result = calculateDuration(span);

      expect(result).toBe(1000);
    });

    it("should handle the conversion formula correctly", () => {
      // Test the formula: seconds * 1000 + nanoseconds / 1_000_000
      const seconds = 5;
      const nanoseconds = 250_000_000; // 250 million nanoseconds = 250 milliseconds
      const span = createMockSpan({ duration: [seconds, nanoseconds] });

      const result = calculateDuration(span);
      const expected = seconds * 1000 + nanoseconds / 1_000_000;

      expect(result).toBe(expected);
      expect(result).toBe(5250); // 5000 + 250
    });
  });
});
