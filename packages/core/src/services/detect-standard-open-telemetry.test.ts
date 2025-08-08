import { describe, expect, it } from "vitest";

import { STANDARD_OPENTELEMETRY_ATTRIBUTES } from "../constants/span-mappings";
import { createMockSpan } from "../utils/tests/create-mock-span";
import { detectStandardOpenTelemetry } from "./detect-standard-open-telemetry";

describe("detectStandardOpenTelemetry", () => {
  describe("isHttpCall", () => {
    it("should detect HTTP calls by method attribute", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "GET",
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true);
    });

    it("should detect different HTTP methods", () => {
      const methods = [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "HEAD",
        "OPTIONS",
      ];

      methods.forEach((method) => {
        const span = createMockSpan({
          attributes: {
            [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: method,
          },
        });
        expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true);
      });
    });

    it("should not detect HTTP calls without method attribute", () => {
      const span = createMockSpan({
        name: "http request",
        attributes: {
          "http.url": "/api/users",
          "http.status_code": 200,
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(false);
    });

    it("should not detect HTTP calls with null method", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: null,
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(false);
    });

    it("should not detect HTTP calls with undefined method", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: undefined,
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(false);
    });

    it("should detect HTTP calls with empty string method", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "",
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true);
    });
  });

  describe("isDatabaseCall", () => {
    it("should detect database calls by system attribute", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: "mysql",
        },
      });

      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(true);
    });

    it("should detect different database systems", () => {
      const systems = [
        "mysql",
        "postgresql",
        "mongodb",
        "redis",
        "cassandra",
        "sqlite",
        "oracle",
      ];

      systems.forEach((system) => {
        const span = createMockSpan({
          attributes: {
            [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: system,
          },
        });
        expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(true);
      });
    });

    it("should not detect database calls without system attribute", () => {
      const span = createMockSpan({
        name: "database query",
        attributes: {
          "db.sql.table": "users",
          "db.operation.name": "SELECT",
        },
      });

      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(false);
    });

    it("should not detect database calls with null system", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: null,
        },
      });

      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(false);
    });

    it("should detect database calls with empty string system", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: "",
        },
      });

      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(true);
    });
  });

  describe("isFunctionCall", () => {
    it("should detect function calls by name containing 'tool'", () => {
      const span = createMockSpan({
        name: "tool execution",
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
    });

    it("should detect function calls by name containing 'function'", () => {
      const span = createMockSpan({
        name: "function call",
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
    });

    it("should detect function calls by function.name attribute", () => {
      const span = createMockSpan({
        name: "custom operation",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME]: "calculator.add",
        },
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
    });

    it("should be case insensitive for name matching", () => {
      const spans = [
        createMockSpan({ name: "TOOL Execution" }),
        createMockSpan({ name: "Function Call" }),
        createMockSpan({ name: "My Tool" }),
        createMockSpan({ name: "Custom FUNCTION" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
      });
    });

    it("should detect function calls with both name and attribute", () => {
      const span = createMockSpan({
        name: "tool operation",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME]: "my_function",
        },
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
    });

    it("should not detect function calls without keywords or attributes", () => {
      const span = createMockSpan({
        name: "generic operation",
        attributes: {},
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(false);
    });

    it("should detect function calls with substring matches", () => {
      const spans = [
        createMockSpan({ name: "calculator-tool-execute" }),
        createMockSpan({ name: "my_function_call" }),
        createMockSpan({ name: "tooling-service" }),
        createMockSpan({ name: "functional-test" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
      });
    });
  });

  describe("isLLMCall", () => {
    it("should detect LLM calls by name containing 'openai'", () => {
      const span = createMockSpan({
        name: "openai completion",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
    });

    it("should detect LLM calls by name containing 'anthropic'", () => {
      const span = createMockSpan({
        name: "anthropic claude call",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
    });

    it("should detect LLM calls by name containing 'gpt'", () => {
      const span = createMockSpan({
        name: "gpt-4 generation",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
    });

    it("should detect LLM calls by name containing 'claude'", () => {
      const span = createMockSpan({
        name: "claude-3 sonnet",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
    });

    it("should be case insensitive for LLM detection", () => {
      const spans = [
        createMockSpan({ name: "OpenAI Call" }),
        createMockSpan({ name: "ANTHROPIC Generation" }),
        createMockSpan({ name: "GPT-4 Response" }),
        createMockSpan({ name: "Claude-3 SONNET" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
      });
    });

    it("should detect LLM calls with substring matches", () => {
      const spans = [
        createMockSpan({ name: "call-openai-api" }),
        createMockSpan({ name: "anthropic-claude-request" }),
        createMockSpan({ name: "chatgpt-completion" }),
        createMockSpan({ name: "claude-response" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
      });
    });

    it("should not detect LLM calls without keywords", () => {
      const span = createMockSpan({
        name: "generic llm call",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(false);
    });
  });

  describe("isChainOperation", () => {
    it("should detect chain operations by name containing 'chain'", () => {
      const span = createMockSpan({
        name: "chain execution",
      });

      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
    });

    it("should detect chain operations by name containing 'workflow'", () => {
      const span = createMockSpan({
        name: "workflow runner",
      });

      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
    });

    it("should detect chain operations by name containing 'langchain'", () => {
      const span = createMockSpan({
        name: "langchain qa",
      });

      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
    });

    it("should be case insensitive for chain detection", () => {
      const spans = [
        createMockSpan({ name: "Chain Operation" }),
        createMockSpan({ name: "WORKFLOW Execution" }),
        createMockSpan({ name: "LangChain QA" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
      });
    });

    it("should detect chain operations with substring matches", () => {
      const spans = [
        createMockSpan({ name: "service-chain-processor" }),
        createMockSpan({ name: "my-workflow-engine" }),
        createMockSpan({ name: "langchain-retrieval-qa" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
      });
    });

    it("should not detect chain operations without keywords", () => {
      const span = createMockSpan({
        name: "generic operation",
      });

      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(false);
    });
  });

  describe("isAgentOperation", () => {
    it("should detect agent operations by name containing 'agent'", () => {
      const span = createMockSpan({
        name: "agent execution",
      });

      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(true);
    });

    it("should be case insensitive for agent detection", () => {
      const spans = [
        createMockSpan({ name: "Agent Runner" }),
        createMockSpan({ name: "AGENT Operation" }),
        createMockSpan({ name: "My Agent" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(true);
      });
    });

    it("should detect agent operations with substring matches", () => {
      const spans = [
        createMockSpan({ name: "customer-agent-service" }),
        createMockSpan({ name: "ai-agent-workflow" }),
        createMockSpan({ name: "agent-based-system" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(true);
      });
    });

    it("should not detect agent operations without keywords", () => {
      const span = createMockSpan({
        name: "generic operation",
      });

      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(false);
    });
  });

  describe("isRetrievalOperation", () => {
    it("should detect retrieval operations by name containing 'pinecone'", () => {
      const span = createMockSpan({
        name: "pinecone query",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should detect retrieval operations by name containing 'chroma'", () => {
      const span = createMockSpan({
        name: "chroma search",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should detect retrieval operations by name containing 'retrieval'", () => {
      const span = createMockSpan({
        name: "retrieval operation",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should detect retrieval operations by name containing 'vector'", () => {
      const span = createMockSpan({
        name: "vector database",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should detect retrieval operations by name containing 'search'", () => {
      const span = createMockSpan({
        name: "search documents",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should be case insensitive for retrieval detection", () => {
      const spans = [
        createMockSpan({ name: "PINECONE Query" }),
        createMockSpan({ name: "Chroma Search" }),
        createMockSpan({ name: "VECTOR Database" }),
        createMockSpan({ name: "Retrieval Operation" }),
        createMockSpan({ name: "SEARCH Documents" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
          true,
        );
      });
    });

    it("should detect retrieval operations with substring matches", () => {
      const spans = [
        createMockSpan({ name: "pinecone-index-query" }),
        createMockSpan({ name: "chroma-collection-search" }),
        createMockSpan({ name: "document-retrieval-service" }),
        createMockSpan({ name: "vector-similarity-search" }),
        createMockSpan({ name: "elasticsearch-search" }),
      ];

      spans.forEach((span) => {
        expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
          true,
        );
      });
    });

    it("should not detect retrieval operations without keywords", () => {
      const span = createMockSpan({
        name: "generic operation",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
        false,
      );
    });
  });

  describe("multiple detection methods", () => {
    it("should handle spans that match multiple detection methods", () => {
      const span = createMockSpan({
        name: "openai tool function", // Matches LLM + function + tool keywords
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME]: "openai_call",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "POST",
        },
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true);
      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(false);
    });

    it("should handle spans that match no detection methods", () => {
      const span = createMockSpan({
        name: "generic operation",
        attributes: {
          "custom.field": "custom_value",
        },
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
        false,
      );
    });
  });

  describe("real-world scenarios", () => {
    it("should detect typical web service HTTP spans", () => {
      const span = createMockSpan({
        name: "GET /api/users",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: "GET",
          "http.url": "/api/users",
          "http.status_code": 200,
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true);
    });

    it("should detect database query spans", () => {
      const span = createMockSpan({
        name: "SELECT users FROM database",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: "postgresql",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "SELECT",
        },
      });

      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(true);
    });

    it("should detect LangChain application spans", () => {
      const span = createMockSpan({
        name: "langchain.chain.RetrievalQA.invoke",
      });

      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(true);
    });

    it("should detect vector database operations", () => {
      const span = createMockSpan({
        name: "pinecone.index.query",
      });

      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(true);
    });

    it("should detect custom tool functions", () => {
      const span = createMockSpan({
        name: "calculator.add",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME]: "calculator.add",
        },
      });

      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true);
    });

    it("should detect OpenAI API calls as LLM operations", () => {
      const span = createMockSpan({
        name: "openai.chat.completions.create",
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle empty span names", () => {
      const span = createMockSpan({
        name: "",
        attributes: {},
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
        false,
      );
    });

    it("should handle spans with only whitespace in names", () => {
      const span = createMockSpan({
        name: "   ",
        attributes: {},
      });

      expect(detectStandardOpenTelemetry.isLLMCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isChainOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isAgentOperation(span)).toBe(false);
      expect(detectStandardOpenTelemetry.isRetrievalOperation(span)).toBe(
        false,
      );
    });

    it("should handle attribute values of different types", () => {
      const span = createMockSpan({
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD]: 200, // number instead of string
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM]: true, // boolean instead of string
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME]: [], // array instead of string
        },
      });

      expect(detectStandardOpenTelemetry.isHttpCall(span)).toBe(true); // 200 is truthy
      expect(detectStandardOpenTelemetry.isDatabaseCall(span)).toBe(true); // true is truthy
      expect(detectStandardOpenTelemetry.isFunctionCall(span)).toBe(true); // [] is truthy
    });
  });
});
