import { describe, it, expect } from "vitest";

import { LLM_ATTRIBUTES } from "../constants";
import { createMockSpan } from "../utils/tests/create-mock-span";
import { extractTokenCount } from "./extract-token-count";

describe("extractTokenCount", () => {
  it("should return total tokens when available as number", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: 150,
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 100,
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 50,
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(150);
  });

  it("should sum input and output tokens when total is not available", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 80,
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 40,
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(120);
  });

  it("should return 0 when no token attributes are available", () => {
    const span = createMockSpan({});

    const result = extractTokenCount(span);

    expect(result).toBe(0);
  });

  it("should handle mixed token types correctly", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: "not-a-number", // string value
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 60,
        // TOKENS_OUTPUT is missing (undefined)
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(60); // 60 + 0 (undefined becomes 0)
  });

  it("should handle partial token information", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: null,
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 90,
        // TOKENS_OUTPUT is missing
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(90); // 90 + 0
  });

  it("should handle zero token values correctly", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 0,
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 0,
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(0);
  });

  it("should prioritize total tokens over individual counts", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: 200,
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 999, // Should be ignored
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 999, // Should be ignored
      },
    });

    const result = extractTokenCount(span);

    expect(result).toBe(200);
  });

  it("should handle string numbers correctly by treating them as non-numbers", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: "150", // string number
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 80,
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 70,
      },
    });

    const result = extractTokenCount(span);

    // Since '150' is not typeof 'number', it should fall back to input + output
    expect(result).toBe(150); // 80 + 70
  });

  it("should handle boolean values correctly", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: true, // boolean
        [LLM_ATTRIBUTES.TOKENS_INPUT]: false, // boolean
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 25,
      },
    });

    const result = extractTokenCount(span);

    // Booleans are not numbers, so should fall back to input + output
    // false is not a number, so it becomes 0
    expect(result).toBe(25); // 0 + 25
  });

  it("should handle array values correctly", () => {
    const span = createMockSpan({
      attributes: {
        [LLM_ATTRIBUTES.TOKENS_TOTAL]: ["150", "200"], // array
        [LLM_ATTRIBUTES.TOKENS_INPUT]: 30,
        [LLM_ATTRIBUTES.TOKENS_OUTPUT]: 20,
      },
    });

    const result = extractTokenCount(span);

    // Arrays are not numbers, so should fall back to input + output
    expect(result).toBe(50); // 30 + 20
  });

  describe("real-world scenarios", () => {
    it("should handle GPT-4 response attributes", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.request.model": "gpt-4",
          "gen_ai.usage.input_tokens": 150,
          "gen_ai.usage.output_tokens": 75,
          "gen_ai.usage.total_tokens": 225,
          "gen_ai.usage.cost": 0.0045,
        },
      });

      const result = extractTokenCount(span);

      expect(result).toBe(225);
    });

    it("should handle Claude response attributes", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.request.model": "claude-3-sonnet",
          "gen_ai.usage.input_tokens": 1250,
          "gen_ai.usage.output_tokens": 380,
          // No total tokens provided
          "gen_ai.usage.cost": 0.0245,
        },
      });

      const result = extractTokenCount(span);

      expect(result).toBe(1630); // 1250 + 380
    });

    it("should handle incomplete LLM response", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.request.model": "gpt-3.5-turbo",
          "gen_ai.usage.input_tokens": 120,
          // Missing output tokens (streaming response interrupted?)
          "error.type": "timeout",
        },
      });

      const result = extractTokenCount(span);

      expect(result).toBe(120); // 120 + 0
    });
  });
});
