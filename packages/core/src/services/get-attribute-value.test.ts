import { describe, it, expect } from "vitest";

import { createMockSpan } from "../utils/tests/create-mock-span";
import { getAttributeValue } from "./get-attribute-value";

describe("getAttributeValue", () => {
  describe("string values", () => {
    it("should return string values directly", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.request.model": "gpt-4",
          "http.method": "POST",
          "db.collection.name": "users",
        },
      });

      expect(getAttributeValue(span, "gen_ai.request.model")).toBe("gpt-4");
      expect(getAttributeValue(span, "http.method")).toBe("POST");
      expect(getAttributeValue(span, "db.collection.name")).toBe("users");
    });

    it("should handle empty strings", () => {
      const span = createMockSpan({
        attributes: {
          "empty.field": "",
        },
      });

      const result = getAttributeValue(span, "empty.field");

      expect(result).toBe("");
    });

    it("should handle strings with special characters", () => {
      const span = createMockSpan({
        attributes: {
          "query.text": "What is 2+2? Let me know ASAP!",
          "user.email": "test@example.com",
          "json.data": '{"key": "value", "nested": {"count": 42}}',
        },
      });

      expect(getAttributeValue(span, "query.text")).toBe(
        "What is 2+2? Let me know ASAP!",
      );
      expect(getAttributeValue(span, "user.email")).toBe("test@example.com");
      expect(getAttributeValue(span, "json.data")).toBe(
        '{"key": "value", "nested": {"count": 42}}',
      );
    });
  });

  describe("number values", () => {
    it("should return number values directly", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.usage.total_tokens": 150,
          "http.status_code": 200,
          "vector.top_k": 5,
          "gen_ai.usage.cost": 0.0045,
        },
      });

      expect(getAttributeValue(span, "gen_ai.usage.total_tokens")).toBe(150);
      expect(getAttributeValue(span, "http.status_code")).toBe(200);
      expect(getAttributeValue(span, "vector.top_k")).toBe(5);
      expect(getAttributeValue(span, "gen_ai.usage.cost")).toBe(0.0045);
    });

    it("should handle zero values", () => {
      const span = createMockSpan({
        attributes: {
          "retry.attempt": 0,
          "gen_ai.usage.cost": 0,
        },
      });

      expect(getAttributeValue(span, "retry.attempt")).toBe(0);
      expect(getAttributeValue(span, "gen_ai.usage.cost")).toBe(0);
    });

    it("should handle negative numbers", () => {
      const span = createMockSpan({
        attributes: {
          temperature: -5.5,
          offset: -100,
        },
      });

      expect(getAttributeValue(span, "temperature")).toBe(-5.5);
      expect(getAttributeValue(span, "offset")).toBe(-100);
    });

    it("should handle special number values", () => {
      const span = createMockSpan({
        attributes: {
          "nan.value": NaN,
          "infinity.value": Infinity,
          "negative.infinity": -Infinity,
          "min.value": Number.MIN_VALUE,
          "max.value": Number.MAX_VALUE,
        },
      });

      expect(getAttributeValue(span, "nan.value")).toBeNaN();
      expect(getAttributeValue(span, "infinity.value")).toBe(Infinity);
      expect(getAttributeValue(span, "negative.infinity")).toBe(-Infinity);
      expect(getAttributeValue(span, "min.value")).toBe(Number.MIN_VALUE);
      expect(getAttributeValue(span, "max.value")).toBe(Number.MAX_VALUE);
    });
  });

  describe("boolean values", () => {
    it("should return boolean values directly", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.streaming": true,
          "retry.enabled": false,
          "cache.hit": true,
          "error.occurred": false,
        },
      });

      expect(getAttributeValue(span, "gen_ai.streaming")).toBe(true);
      expect(getAttributeValue(span, "retry.enabled")).toBe(false);
      expect(getAttributeValue(span, "cache.hit")).toBe(true);
      expect(getAttributeValue(span, "error.occurred")).toBe(false);
    });
  });

  describe("array values", () => {
    it("should convert string arrays to comma-separated strings", () => {
      const span = createMockSpan({
        attributes: {
          "agent.tools": ["calculator", "search", "wikipedia"],
          "supported.models": ["gpt-3.5-turbo", "gpt-4"],
          tags: ["ai", "ml", "nlp"],
        },
      });

      expect(getAttributeValue(span, "agent.tools")).toBe(
        "calculator, search, wikipedia",
      );
      expect(getAttributeValue(span, "supported.models")).toBe(
        "gpt-3.5-turbo, gpt-4",
      );
      expect(getAttributeValue(span, "tags")).toBe("ai, ml, nlp");
    });

    it("should convert number arrays to comma-separated strings", () => {
      const span = createMockSpan({
        attributes: {
          "port.numbers": [8080, 8081, 8082],
          scores: [95.5, 87.2, 92.1],
          indices: [0, 1, 2, 5, 10],
        },
      });

      expect(getAttributeValue(span, "port.numbers")).toBe("8080, 8081, 8082");
      expect(getAttributeValue(span, "scores")).toBe("95.5, 87.2, 92.1");
      expect(getAttributeValue(span, "indices")).toBe("0, 1, 2, 5, 10");
    });

    it("should convert boolean arrays to comma-separated strings", () => {
      const span = createMockSpan({
        attributes: {
          "feature.flags": [true, false, true],
          validations: [false, false, true, true],
        },
      });

      expect(getAttributeValue(span, "feature.flags")).toBe(
        "true, false, true",
      );
      expect(getAttributeValue(span, "validations")).toBe(
        "false, false, true, true",
      );
    });

    it("should convert mixed arrays to comma-separated strings", () => {
      const span = createMockSpan({
        attributes: {
          "mixed.values": ["text", 42, true, "another"],
          "config.values": [100, "auto", false],
        },
      });

      expect(getAttributeValue(span, "mixed.values")).toBe(
        "text, 42, true, another",
      );
      expect(getAttributeValue(span, "config.values")).toBe("100, auto, false");
    });

    it("should handle empty arrays", () => {
      const span = createMockSpan({
        attributes: {
          "empty.array": [],
        },
      });

      const result = getAttributeValue(span, "empty.array");

      expect(result).toBe("");
    });

    it("should handle arrays with null and undefined values", () => {
      const span = createMockSpan({
        attributes: {
          "sparse.array": ["value1", null, undefined, "value2"],
          "null.array": [null, null],
          "undefined.array": [undefined, undefined],
        },
      });

      expect(getAttributeValue(span, "sparse.array")).toBe(
        "value1, , , value2",
      );
      expect(getAttributeValue(span, "null.array")).toBe(", ");
      expect(getAttributeValue(span, "undefined.array")).toBe(", ");
    });
  });

  describe("null and undefined values", () => {
    it("should return undefined for null values", () => {
      const span = createMockSpan({
        attributes: {
          "null.field": null,
        },
      });

      const result = getAttributeValue(span, "null.field");

      expect(result).toBeUndefined();
    });

    it("should return undefined for undefined values", () => {
      const span = createMockSpan({
        attributes: {
          "undefined.field": undefined,
        },
      });

      const result = getAttributeValue(span, "undefined.field");

      expect(result).toBeUndefined();
    });

    it("should return undefined for non-existent keys", () => {
      const span = createMockSpan({
        attributes: {
          "existing.key": "value",
        },
      });

      const result = getAttributeValue(span, "non.existent.key");

      expect(result).toBeUndefined();
    });
  });

  describe("unsupported types", () => {
    it("should return undefined for object values", () => {
      const span = createMockSpan({
        attributes: {
          "object.field": { key: "value", nested: { count: 42 } },
          "date.field": new Date("2023-01-01"),
          "regex.field": /pattern/g,
        },
      });

      expect(getAttributeValue(span, "object.field")).toBeUndefined();
      expect(getAttributeValue(span, "date.field")).toBeUndefined();
      expect(getAttributeValue(span, "regex.field")).toBeUndefined();
    });

    it("should return undefined for function values", () => {
      const span = createMockSpan({
        attributes: {
          "function.field": () => "test",
        },
      });

      const result = getAttributeValue(span, "function.field");

      expect(result).toBeUndefined();
    });

    it("should return undefined for symbol values", () => {
      const span = createMockSpan({
        attributes: {
          "symbol.field": Symbol("test"),
        },
      });

      const result = getAttributeValue(span, "symbol.field");

      expect(result).toBeUndefined();
    });
  });

  describe("real-world OpenTelemetry scenarios", () => {
    it("should handle typical LLM span attributes", () => {
      const span = createMockSpan({
        attributes: {
          "gen_ai.request.model": "gpt-4",
          "gen_ai.usage.input_tokens": 150,
          "gen_ai.usage.output_tokens": 75,
          "gen_ai.usage.total_tokens": 225,
          "gen_ai.usage.cost": 0.0045,
          "gen_ai.request.temperature": 0.7,
          "gen_ai.streaming": false,
        },
      });

      expect(getAttributeValue(span, "gen_ai.request.model")).toBe("gpt-4");
      expect(getAttributeValue(span, "gen_ai.usage.input_tokens")).toBe(150);
      expect(getAttributeValue(span, "gen_ai.usage.output_tokens")).toBe(75);
      expect(getAttributeValue(span, "gen_ai.usage.total_tokens")).toBe(225);
      expect(getAttributeValue(span, "gen_ai.usage.cost")).toBe(0.0045);
      expect(getAttributeValue(span, "gen_ai.request.temperature")).toBe(0.7);
      expect(getAttributeValue(span, "gen_ai.streaming")).toBe(false);
    });

    it("should handle typical HTTP span attributes", () => {
      const span = createMockSpan({
        attributes: {
          "http.method": "POST",
          "http.url": "https://api.openai.com/v1/chat/completions",
          "http.status_code": 200,
          "http.request.header.content-type": "application/json",
          "http.response.header.x-ratelimit-remaining": "59",
        },
      });

      expect(getAttributeValue(span, "http.method")).toBe("POST");
      expect(getAttributeValue(span, "http.url")).toBe(
        "https://api.openai.com/v1/chat/completions",
      );
      expect(getAttributeValue(span, "http.status_code")).toBe(200);
      expect(getAttributeValue(span, "http.request.header.content-type")).toBe(
        "application/json",
      );
      expect(
        getAttributeValue(span, "http.response.header.x-ratelimit-remaining"),
      ).toBe("59");
    });

    it("should handle typical database span attributes", () => {
      const span = createMockSpan({
        attributes: {
          "db.system": "pinecone",
          "db.operation.name": "query",
          "db.collection.name": "embeddings",
          "db.query.text": "SELECT * FROM vectors WHERE similarity > 0.8",
          "vector.top_k": 10,
          "vector.include_metadata": true,
        },
      });

      expect(getAttributeValue(span, "db.system")).toBe("pinecone");
      expect(getAttributeValue(span, "db.operation.name")).toBe("query");
      expect(getAttributeValue(span, "db.collection.name")).toBe("embeddings");
      expect(getAttributeValue(span, "db.query.text")).toBe(
        "SELECT * FROM vectors WHERE similarity > 0.8",
      );
      expect(getAttributeValue(span, "vector.top_k")).toBe(10);
      expect(getAttributeValue(span, "vector.include_metadata")).toBe(true);
    });

    it("should handle agent and tool attributes", () => {
      const span = createMockSpan({
        attributes: {
          "agent.name": "ReAct Agent",
          "agent.tools": ["calculator", "search", "wikipedia", "weather"],
          "function.name": "get_weather",
          "function.parameters": '{"location": "Paris", "units": "metric"}',
          "langchain.chain": "RetrievalQA",
          "langchain.chain.type": "stuff",
        },
      });

      expect(getAttributeValue(span, "agent.name")).toBe("ReAct Agent");
      expect(getAttributeValue(span, "agent.tools")).toBe(
        "calculator, search, wikipedia, weather",
      );
      expect(getAttributeValue(span, "function.name")).toBe("get_weather");
      expect(getAttributeValue(span, "function.parameters")).toBe(
        '{"location": "Paris", "units": "metric"}',
      );
      expect(getAttributeValue(span, "langchain.chain")).toBe("RetrievalQA");
      expect(getAttributeValue(span, "langchain.chain.type")).toBe("stuff");
    });

    it("should handle error and retry attributes", () => {
      const span = createMockSpan({
        attributes: {
          "error.type": "rate_limit_exceeded",
          "error.message": "API rate limit exceeded",
          "retry.attempt": 3,
          "retry.max_attempts": 5,
          "retry.delay_ms": 1000,
          "retry.successful": true,
        },
      });

      expect(getAttributeValue(span, "error.type")).toBe("rate_limit_exceeded");
      expect(getAttributeValue(span, "error.message")).toBe(
        "API rate limit exceeded",
      );
      expect(getAttributeValue(span, "retry.attempt")).toBe(3);
      expect(getAttributeValue(span, "retry.max_attempts")).toBe(5);
      expect(getAttributeValue(span, "retry.delay_ms")).toBe(1000);
      expect(getAttributeValue(span, "retry.successful")).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle empty attribute key", () => {
      const span = createMockSpan({
        attributes: {
          "": "empty-key-value",
          "normal.key": "normal-value",
        },
      });

      expect(getAttributeValue(span, "")).toBe("empty-key-value");
      expect(getAttributeValue(span, "normal.key")).toBe("normal-value");
    });

    it("should handle keys with special characters", () => {
      const span = createMockSpan({
        attributes: {
          "key.with-dashes": "dash-value",
          key_with_underscores: "underscore-value",
          "key with spaces": "space-value",
          "key@with#symbols%": "symbol-value",
        },
      });

      expect(getAttributeValue(span, "key.with-dashes")).toBe("dash-value");
      expect(getAttributeValue(span, "key_with_underscores")).toBe(
        "underscore-value",
      );
      expect(getAttributeValue(span, "key with spaces")).toBe("space-value");
      expect(getAttributeValue(span, "key@with#symbols%")).toBe("symbol-value");
    });

    it("should handle very long strings", () => {
      const longString = "a".repeat(10000);
      const span = createMockSpan({
        attributes: {
          "long.string": longString,
        },
      });

      const result = getAttributeValue(span, "long.string");

      expect(result).toBe(longString);
      expect(typeof result).toBe("string");
    });

    it("should handle arrays with very long strings", () => {
      const longString1 = "first-" + "a".repeat(1000);
      const longString2 = "second-" + "b".repeat(1000);
      const span = createMockSpan({
        attributes: {
          "long.array": [longString1, longString2],
        },
      });

      const result = getAttributeValue(span, "long.array");

      expect(result).toBe(`${longString1}, ${longString2}`);
    });
  });
});
