import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  OPENINFERENCE_ATTRIBUTES,
  STANDARD_OPENTELEMETRY_ATTRIBUTES,
} from "../constants/span-mappings";
import { createMockSpan } from "../utils/tests/create-mock-span";
import { determineSpanCategory } from "./determine-span-category";

vi.mock("../services/categorize-open-inference", () => ({
  categorizeOpenInference: vi.fn(),
}));

vi.mock("../services/categorize-open-telemetry-gen-ai", () => ({
  categorizeOpenTelemetryGenAI: vi.fn(),
}));

vi.mock("../services/detect-standard", () => ({
  detectStandard: vi.fn(),
}));

vi.mock("./categorize-standard-open-telemetry", () => ({
  categorizeStandardOpenTelemetry: vi.fn(),
}));

import { categorizeOpenInference } from "../services/categorize-open-inference";
import { categorizeOpenTelemetryGenAI } from "../services/categorize-open-telemetry-gen-ai";
import { detectStandard } from "../services/detect-standard";
import { categorizeStandardOpenTelemetry } from "./categorize-standard-open-telemetry";

describe("determineSpanCategory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("OpenTelemetry GenAI standard priority", () => {
    it("should use OpenTelemetry GenAI when detected and return its category", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("llm_call");

      const result = determineSpanCategory(span);

      expect(detectStandard).toHaveBeenCalledWith(span);
      expect(categorizeOpenTelemetryGenAI).toHaveBeenCalledWith(span);
      expect(categorizeOpenInference).not.toHaveBeenCalled();
      expect(result).toBe("llm_call");
    });

    it("should fallback to standard when OpenTelemetry GenAI returns unknown", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "openai",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("unknown");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "tool_execution",
      );

      const result = determineSpanCategory(span);

      expect(categorizeOpenTelemetryGenAI).toHaveBeenCalledWith(span);
      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(result).toBe("tool_execution");
    });

    it("should not call OpenInference when GenAI is detected", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "execute_tool",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("tool_execution");

      determineSpanCategory(span);

      expect(categorizeOpenInference).not.toHaveBeenCalled();
    });
  });

  describe("OpenInference standard priority", () => {
    it("should use OpenInference when detected and return its category", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "LLM",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("openinference");
      vi.mocked(categorizeOpenInference).mockReturnValue("llm_call");

      const result = determineSpanCategory(span);

      expect(detectStandard).toHaveBeenCalledWith(span);
      expect(categorizeOpenInference).toHaveBeenCalledWith(span);
      expect(categorizeOpenTelemetryGenAI).not.toHaveBeenCalled();
      expect(result).toBe("llm_call");
    });

    it("should fallback to standard when OpenInference returns unknown", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "gpt-4",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("openinference");
      vi.mocked(categorizeOpenInference).mockReturnValue("unknown");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "chain_operation",
      );

      const result = determineSpanCategory(span);

      expect(categorizeOpenInference).toHaveBeenCalledWith(span);
      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(result).toBe("chain_operation");
    });
  });

  describe("Standard OpenTelemetry fallback", () => {
    it("should use standard categorization when standard is detected", () => {
      const span = createMockSpan({
        name: "http request",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "GET",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("standard");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "tool_execution",
      );

      const result = determineSpanCategory(span);

      expect(detectStandard).toHaveBeenCalledWith(span);
      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(categorizeOpenTelemetryGenAI).not.toHaveBeenCalled();
      expect(categorizeOpenInference).not.toHaveBeenCalled();
      expect(result).toBe("tool_execution");
    });

    it("should use standard categorization for default case", () => {
      const span = createMockSpan({
        name: "unknown operation",
      });

      // Return an unexpected value to test default case
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(detectStandard).mockReturnValue("unexpected" as any);
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue("unknown");

      const result = determineSpanCategory(span);

      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(result).toBe("unknown");
    });
  });

  describe("integration scenarios", () => {
    it("should handle spans with mixed standard indicators correctly", () => {
      // Span that could match multiple standards but GenAI takes priority
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "LLM",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "POST",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("llm_call");

      const result = determineSpanCategory(span);

      expect(result).toBe("llm_call");
      expect(categorizeOpenInference).not.toHaveBeenCalled();
    });

    it("should properly cascade through standards when primary returns unknown", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "custom", // Detected as GenAI but unknown operation
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "GET",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("unknown");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "tool_execution",
      );

      const result = determineSpanCategory(span);

      expect(categorizeOpenTelemetryGenAI).toHaveBeenCalledWith(span);
      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(result).toBe("tool_execution");
    });
  });

  describe("real-world span examples", () => {
    it("should categorize OpenAI chat completion spans", () => {
      const span = createMockSpan({
        name: "openai.chat.completions.create",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "openai",
          "gen_ai.request.model": "gpt-4",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("llm_call");

      const result = determineSpanCategory(span);

      expect(result).toBe("llm_call");
    });

    it("should categorize OpenInference LLM spans", () => {
      const span = createMockSpan({
        name: "llm.completion",
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "LLM",
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "gpt-4",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("openinference");
      vi.mocked(categorizeOpenInference).mockReturnValue("llm_call");

      const result = determineSpanCategory(span);

      expect(result).toBe("llm_call");
    });

    it("should categorize standard HTTP spans", () => {
      const span = createMockSpan({
        name: "GET /api/users",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "GET",
          "http.url": "/api/users",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("standard");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "tool_execution",
      );

      const result = determineSpanCategory(span);

      expect(result).toBe("tool_execution");
    });

    it("should categorize tool execution across standards", () => {
      // Test GenAI tool execution
      const genaiSpan = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "execute_tool",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("tool_execution");

      expect(determineSpanCategory(genaiSpan)).toBe("tool_execution");

      // Test OpenInference tool execution
      const openinfSpan = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "TOOL",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("openinference");
      vi.mocked(categorizeOpenInference).mockReturnValue("tool_execution");

      expect(determineSpanCategory(openinfSpan)).toBe("tool_execution");
    });
  });

  describe("error handling and edge cases", () => {
    it("should handle when detectStandard returns unexpected values", () => {
      const span = createMockSpan({ name: "test" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(detectStandard).mockReturnValue(null as any);
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue("unknown");

      const result = determineSpanCategory(span);

      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledWith(span);
      expect(result).toBe("unknown");
    });

    it("should handle when categorization functions throw errors", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockImplementation(() => {
        throw new Error("Categorization error");
      });
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue("unknown");

      // Should not throw, but fallback gracefully
      expect(() => determineSpanCategory(span)).toThrow("Categorization error");
    });

    it("should handle all categorization functions returning unknown", () => {
      const span = createMockSpan({ name: "mysterious span" });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("unknown");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue("unknown");

      const result = determineSpanCategory(span);

      expect(result).toBe("unknown");
    });
  });

  describe("function call order and optimization", () => {
    it("should not call unnecessary categorization functions when primary succeeds", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("opentelemetry_genai");
      vi.mocked(categorizeOpenTelemetryGenAI).mockReturnValue("llm_call");

      determineSpanCategory(span);

      expect(categorizeOpenTelemetryGenAI).toHaveBeenCalledTimes(1);
      expect(categorizeStandardOpenTelemetry).not.toHaveBeenCalled();
      expect(categorizeOpenInference).not.toHaveBeenCalled();
    });

    it("should call fallback only when needed", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "UNKNOWN_KIND",
        },
      });

      vi.mocked(detectStandard).mockReturnValue("openinference");
      vi.mocked(categorizeOpenInference).mockReturnValue("unknown");
      vi.mocked(categorizeStandardOpenTelemetry).mockReturnValue(
        "tool_execution",
      );

      const result = determineSpanCategory(span);

      expect(categorizeOpenInference).toHaveBeenCalledTimes(1);
      expect(categorizeStandardOpenTelemetry).toHaveBeenCalledTimes(1);
      expect(result).toBe("tool_execution");
    });
  });
});
