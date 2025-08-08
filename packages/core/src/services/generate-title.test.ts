import { describe, it, expect } from "vitest";

import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  STANDARD_OPENTELEMETRY_ATTRIBUTES,
} from "../constants/span-mappings.ts";
import { createMockSpan } from "../utils/tests/create-mock-span";
import { generateTitle } from "./generate-title";

describe("generateTitle", () => {
  describe("LLM operations", () => {
    it("should use model name for LLM operations", () => {
      const span = createMockSpan({
        name: "chat.completions.create",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "gpt-4",
          [OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_TOTAL_TOKENS]: 150,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("gpt-4 - chat.completions.create");
    });

    it("should handle different LLM models", () => {
      const span = createMockSpan({
        name: "messages.create",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "claude-3-sonnet",
          [OPENTELEMETRY_GENAI_ATTRIBUTES.USAGE_TOTAL_TOKENS]: 0.0245,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("claude-3-sonnet - messages.create");
    });

    it("should handle model as different data types", () => {
      const spanWithStringModel = createMockSpan({
        name: "completion",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "gpt-3.5-turbo",
        },
      });

      const spanWithNumberModel = createMockSpan({
        name: "completion",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: 123, // Invalid but should still work
        },
      });

      expect(generateTitle(spanWithStringModel)).toBe(
        "gpt-3.5-turbo - completion",
      );
      expect(generateTitle(spanWithNumberModel)).toBe("123 - completion");
    });
  });

  describe("Vector DB operations", () => {
    it("should use collection and operation for vector DB operations", () => {
      const span = createMockSpan({
        name: "vector_search",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION]: "embeddings",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "query",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("embeddings - query");
    });

    it("should handle different vector DB operations", () => {
      const span = createMockSpan({
        name: "pinecone_upsert",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION]: "documents",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "upsert",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("documents - upsert");
    });

    it("should fall back to span name when collection is missing", () => {
      const span = createMockSpan({
        name: "vector_search",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "query",
          // Missing collection
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("vector_search");
    });

    it("should fall back to span name when operation is missing", () => {
      const span = createMockSpan({
        name: "vector_search",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION]: "embeddings",
          // Missing operation
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("vector_search");
    });

    it("should fall back to span name when both collection and operation are missing", () => {
      const span = createMockSpan({
        name: "vector_search",
        attributes: {},
      });

      const result = generateTitle(span);

      expect(result).toBe("vector_search");
    });
  });

  describe("HTTP operations", () => {
    it("should use method and URL for HTTP operations", () => {
      const span = createMockSpan({
        name: "http_request",
        attributes: {
          "http.method": "POST",
          "http.url": "https://api.example.com/users",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("POST https://api.example.com/users");
    });

    it("should handle different HTTP methods", () => {
      const getSpan = createMockSpan({
        name: "fetch",
        attributes: {
          "http.method": "GET",
          "http.url": "https://api.weather.com/v1/current",
        },
      });

      const putSpan = createMockSpan({
        name: "update_user",
        attributes: {
          "http.method": "PUT",
          "http.url": "https://api.example.com/users/123",
        },
      });

      expect(generateTitle(getSpan)).toBe(
        "GET https://api.weather.com/v1/current",
      );
      expect(generateTitle(putSpan)).toBe(
        "PUT https://api.example.com/users/123",
      );
    });

    it("should fall back to span name when method is missing", () => {
      const span = createMockSpan({
        name: "http_request",
        attributes: {
          "http.url": "https://api.example.com/users",
          // Missing method
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("http_request");
    });

    it("should fall back to span name when URL is missing", () => {
      const span = createMockSpan({
        name: "http_request",
        attributes: {
          "http.method": "POST",
          // Missing URL
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("http_request");
    });
  });

  describe("priority order", () => {
    it("should prioritize LLM model over vector DB attributes", () => {
      const span = createMockSpan({
        name: "mixed_operation",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "gpt-4",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION]: "embeddings",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "query",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("gpt-4 - mixed_operation");
    });

    it("should prioritize LLM model over HTTP attributes", () => {
      const span = createMockSpan({
        name: "mixed_operation",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: "claude-3-sonnet",
          "http.method": "POST",
          "http.url": "https://api.anthropic.com/v1/messages",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("claude-3-sonnet - mixed_operation");
    });

    it("should prioritize vector DB over HTTP attributes", () => {
      const span = createMockSpan({
        name: "mixed_operation",
        attributes: {
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION]: "documents",
          [STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION]: "search",
          "http.method": "POST",
          "http.url": "https://api.pinecone.io/vectors/query",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("documents - search");
    });
  });

  describe("fallback behavior", () => {
    it("should return span name when no special attributes are present", () => {
      const span = createMockSpan({
        name: "generic_operation",
        attributes: {
          "some.other.attribute": "value",
          "custom.metric": 42,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("generic_operation");
    });

    it("should handle empty span name", () => {
      const span = createMockSpan({
        name: "",
        attributes: {},
      });

      const result = generateTitle(span);

      expect(result).toBe("");
    });
  });

  describe("real-world scenarios", () => {
    it("should handle OpenAI API call", () => {
      const span = createMockSpan({
        name: "openai.chat.completions.create",
        attributes: {
          "gen_ai.request.model": "gpt-4",
          "gen_ai.usage.input_tokens": 150,
          "gen_ai.usage.output_tokens": 75,
          "gen_ai.request.temperature": 0.7,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("gpt-4 - openai.chat.completions.create");
    });

    it("should handle Anthropic API call", () => {
      const span = createMockSpan({
        name: "anthropic.messages.create",
        attributes: {
          "gen_ai.request.model": "claude-3-sonnet",
          "gen_ai.usage.input_tokens": 1250,
          "gen_ai.usage.output_tokens": 380,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("claude-3-sonnet - anthropic.messages.create");
    });

    it("should handle Pinecone vector search", () => {
      const span = createMockSpan({
        name: "pinecone.query",
        attributes: {
          "db.operation.name": "similarity_search",
          "db.collection.name": "research_papers",
          "vector.top_k": 5,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("research_papers - similarity_search");
    });

    it("should handle Chroma vector operations", () => {
      const span = createMockSpan({
        name: "chroma.collection.query",
        attributes: {
          "db.operation.name": "query",
          "db.collection.name": "document_embeddings",
          "db.query.text": "quantum computing",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("document_embeddings - query");
    });

    it("should handle REST API calls", () => {
      const span = createMockSpan({
        name: "fetch_weather_data",
        attributes: {
          "http.method": "GET",
          "http.url": "https://api.openweathermap.org/data/2.5/weather",
          "http.status_code": 200,
        },
      });

      const result = generateTitle(span);

      expect(result).toBe(
        "GET https://api.openweathermap.org/data/2.5/weather",
      );
    });

    it("should handle tool function calls without special attributes", () => {
      const span = createMockSpan({
        name: "calculate_tip",
        attributes: {
          "function.name": "calculate_tip",
          "function.parameters": '{"bill_amount": 50, "tip_percentage": 20}',
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("calculate_tip");
    });

    it("should handle LangChain operations without special title attributes", () => {
      const span = createMockSpan({
        name: "langchain.chain.invoke",
        attributes: {
          "langchain.chain": "RetrievalQA",
          "langchain.chain.type": "stuff",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("langchain.chain.invoke");
    });
  });

  describe("edge cases with attribute types", () => {
    it("should handle boolean values", () => {
      const span = createMockSpan({
        name: "test",
        attributes: {
          [OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL]: true, // boolean
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("true - test");
    });

    it("should handle numeric values for string fields", () => {
      const span = createMockSpan({
        name: "http_request",
        attributes: {
          "http.method": 404, // number instead of string
          "http.url": "https://api.example.com/not-found",
        },
      });

      const result = generateTitle(span);

      expect(result).toBe("404 https://api.example.com/not-found");
    });
  });
});
