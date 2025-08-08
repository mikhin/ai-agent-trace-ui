import { describe, expect, it } from "vitest";

import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  OPENINFERENCE_ATTRIBUTES,
} from "../constants/span-mappings";
import { createMockSpan } from "../utils/tests/create-mock-span";
import { detectStandard } from "./detect-standard";

describe("detectStandard", () => {
  describe("OpenTelemetry GenAI detection", () => {
    it("should detect OpenTelemetry GenAI by operation name", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect OpenTelemetry GenAI by system attribute", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "openai",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect OpenTelemetry GenAI with both operation name and system", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "execute_tool",
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "anthropic",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    // Note: detectStandard only checks OPERATION_NAME and SYSTEM for GenAI detection
    // These attributes alone don't trigger GenAI detection
    it("should not detect OpenTelemetry GenAI with only model attribute", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "gpt-4",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should not detect OpenTelemetry GenAI with only agent name", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.AGENT_NAME]: "customer-support-agent",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should not detect OpenTelemetry GenAI with only tool name", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.TOOL_NAME]: "calculator",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });
  });

  describe("OpenInference detection", () => {
    it("should detect OpenInference by span kind", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "LLM",
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect OpenInference by LLM model", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "gpt-4",
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect OpenInference with both span kind and model", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "CHAIN",
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "claude-3-sonnet",
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    // Note: detectStandard only checks SPAN_KIND and LLM_MODEL for OpenInference detection
    // These attributes alone don't trigger OpenInference detection
    it("should not detect OpenInference with only input messages", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.INPUT_MESSAGES]: JSON.stringify([
            { role: "user", content: "Hello" },
          ]),
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should not detect OpenInference with only retrieval documents", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.RETRIEVAL_DOCUMENTS]: JSON.stringify([
            { content: "Document content" },
          ]),
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should not detect OpenInference with only embedding model", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.EMBEDDING_MODEL]: "text-embedding-ada-002",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });
  });

  describe("priority order", () => {
    it("should prioritize OpenTelemetry GenAI over OpenInference when both are present", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "chat",
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "LLM",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should prioritize OpenTelemetry GenAI system over OpenInference model", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: "openai",
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "gpt-4",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should prioritize OpenTelemetry GenAI even with multiple OpenInference attributes", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "invoke_agent",
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "AGENT",
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: "claude-3-sonnet",
          [OPENINFERENCE_ATTRIBUTES.INPUT_MESSAGES]: JSON.stringify([
            { role: "user", content: "Test" },
          ]),
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });
  });

  describe("standard OpenTelemetry fallback", () => {
    it("should default to standard when no special attributes are present", () => {
      const span = createMockSpan({
        name: "http request",
        attributes: {
          "http.method": "GET",
          "http.url": "/api/users",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should default to standard with empty attributes", () => {
      const span = createMockSpan({
        attributes: {},
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should default to standard with unrelated attributes", () => {
      const span = createMockSpan({
        attributes: {
          "custom.attribute": "value",
          "db.system": "mysql",
          "http.status_code": 200,
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });
  });

  describe("edge cases", () => {
    it("should handle null attribute values", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: null,
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: null,
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should handle undefined attribute values", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: undefined,
          [OPENINFERENCE_ATTRIBUTES.LLM_MODEL]: undefined,
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should handle empty string attribute values correctly", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: "",
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "",
        },
      });

      // Empty strings are falsy in this context, so should default to standard
      expect(detectStandard(span)).toBe("standard");
    });

    it("should handle whitespace-only string values", () => {
      const span = createMockSpan({
        attributes: {
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: "   ",
        },
      });

      // Whitespace strings are truthy
      expect(detectStandard(span)).toBe("openinference");
    });

    it("should handle boolean attribute values", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.OPERATION_NAME]: false,
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: true,
        },
      });

      // true is truthy, false is falsy
      expect(detectStandard(span)).toBe("openinference");
    });

    it("should handle numeric attribute values", () => {
      const span = createMockSpan({
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.SYSTEM]: 0, // falsy
          [OPENINFERENCE_ATTRIBUTES.SPAN_KIND]: 1, // truthy
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });
  });

  describe("real-world scenarios", () => {
    it("should detect OpenAI chat completion spans", () => {
      const span = createMockSpan({
        name: "openai.chat.completions.create",
        attributes: {
          "gen_ai.operation.name": "chat",
          "gen_ai.system": "openai",
          "gen_ai.request.model": "gpt-4",
          "gen_ai.usage.input_tokens": 150,
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect Anthropic message creation spans", () => {
      const span = createMockSpan({
        name: "anthropic.messages.create",
        attributes: {
          "gen_ai.operation.name": "generate_content",
          "gen_ai.system": "anthropic",
          "gen_ai.request.model": "claude-3-sonnet",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect tool execution spans", () => {
      const span = createMockSpan({
        name: "execute_tool calculator",
        attributes: {
          "gen_ai.operation.name": "execute_tool",
          "gen_ai.tool.name": "calculator",
          "gen_ai.tool.description": "Performs mathematical calculations",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect agent invocation spans", () => {
      const span = createMockSpan({
        name: "invoke_agent customer_support",
        attributes: {
          "gen_ai.operation.name": "invoke_agent",
          "gen_ai.agent.name": "customer-support-agent",
          "gen_ai.agent.description": "Handles customer inquiries",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should detect OpenInference LLM spans", () => {
      const span = createMockSpan({
        name: "llm.completion",
        attributes: {
          "openinference.span.kind": "LLM",
          "llm.model_name": "gpt-4",
          "llm.input_messages": JSON.stringify([
            { role: "system", content: "You are a helpful assistant" },
            { role: "user", content: "Hello!" },
          ]),
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect OpenInference retrieval spans", () => {
      const span = createMockSpan({
        name: "retrieval.query",
        attributes: {
          "openinference.span.kind": "RETRIEVER",
          "retrieval.documents": JSON.stringify([
            { content: "Document 1 content", metadata: { source: "doc1.pdf" } },
          ]),
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect OpenInference embedding spans", () => {
      const span = createMockSpan({
        name: "embedding.create",
        attributes: {
          "openinference.span.kind": "EMBEDDING",
          "embedding.model_name": "text-embedding-ada-002",
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect standard HTTP API spans", () => {
      const span = createMockSpan({
        name: "GET /api/users",
        attributes: {
          "http.method": "GET",
          "http.url": "/api/users",
          "http.status_code": 200,
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should detect standard database spans", () => {
      const span = createMockSpan({
        name: "SELECT users",
        attributes: {
          "db.system": "postgresql",
          "db.operation.name": "SELECT",
          "db.sql.table": "users",
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });

    it("should detect standard function call spans", () => {
      const span = createMockSpan({
        name: "calculator.add",
        attributes: {
          "function.name": "calculator.add",
          "function.parameters": JSON.stringify({ a: 5, b: 3 }),
        },
      });

      expect(detectStandard(span)).toBe("standard");
    });
  });

  describe("mixed standard scenarios", () => {
    it("should prioritize GenAI when mixed with standard attributes", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.operation.name": "chat",
          "http.method": "POST",
          "db.system": "mysql",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });

    it("should prioritize OpenInference when mixed with standard attributes", () => {
      const span = createMockSpan({
        attributes: {
          "openinference.span.kind": "TOOL",
          "http.method": "POST",
          "function.name": "calculator",
        },
      });

      expect(detectStandard(span)).toBe("openinference");
    });

    it("should detect spans from actual trace examples (limited by actual detection logic)", () => {
      // Based on the real trace data you showed earlier
      // Only spans with operation_name or system will be detected as GenAI
      const span = createMockSpan({
        name: "call_llm gpt-4.1-mini",
        attributes: {
          "gen_ai.operation.name": "chat", // This will trigger GenAI detection
          "gen_ai.request.model": "gpt-4.1-mini",
          "custom.field": "custom_value",
        },
      });

      expect(detectStandard(span)).toBe("opentelemetry_genai");
    });
  });
});
