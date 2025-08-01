import { describe, expect, it } from "vitest";

import { createMockSpan } from "../utils/tests/create-mock-span";
import { determineSpanType } from "./determine-span-type";

describe("determineSpanType", () => {
  it("should return 'TOOL' for spans with tool keywords in name", () => {
    const span = createMockSpan({ name: "tool operation" });
    expect(determineSpanType(span)).toBe("TOOL");
  });

  it("should return 'TOOL' for spans with function attributes", () => {
    const span = createMockSpan({
      attributes: { "function.name": "myFunction" },
      name: "Function Call",
    });
    expect(determineSpanType(span)).toBe("TOOL");
  });

  it("should return 'CHAIN' for spans with chain keywords in name", () => {
    const span = createMockSpan({ name: "langchain operation" });
    expect(determineSpanType(span)).toBe("CHAIN");
  });

  it("should return 'CHAIN' for spans with langchain attributes", () => {
    const span = createMockSpan({
      attributes: { "langchain.chain": "exampleChain" },
      name: "Complex Chain",
    });
    expect(determineSpanType(span)).toBe("CHAIN");
  });

  it("should return 'AGENT' for spans with agent keywords in name", () => {
    const span = createMockSpan({ name: "agent operation" });
    expect(determineSpanType(span)).toBe("AGENT");
  });

  it("should return 'AGENT' for spans with agent attributes", () => {
    const span = createMockSpan({
      attributes: { "agent.name": "myAgent" },
      name: "Agent Flow",
    });
    expect(determineSpanType(span)).toBe("AGENT");
  });

  it("should return 'TOOL' for spans with vector DB attributes", () => {
    const span = createMockSpan({
      attributes: { "vector.db.operation": "insert" },
      name: "Vector DB Operation",
    });
    expect(determineSpanType(span)).toBe("TOOL");
  });

  it("should return 'TOOL' for spans with HTTP method attributes", () => {
    const span = createMockSpan({
      attributes: { "http.method": "GET" },
      name: "HTTP Call",
    });
    expect(determineSpanType(span)).toBe("TOOL");
  });

  it("should return 'TOOL' for spans with database attributes", () => {
    const span = createMockSpan({
      attributes: { "db.system": "mysql" },
      name: "Database Query",
    });
    expect(determineSpanType(span)).toBe("TOOL");
  });

  it("should return 'LLM' for spans with 'openai' and 'anthropic' in name", () => {
    const spanOpenAI = createMockSpan({ name: "openai operation" });
    expect(determineSpanType(spanOpenAI)).toBe("LLM");

    const spanAnthropic = createMockSpan({ name: "anthropic operation" });
    expect(determineSpanType(spanAnthropic)).toBe("LLM");
  });

  it("should return 'TOOL' for spans with 'pinecone' and 'chroma' in name", () => {
    const spanPinecone = createMockSpan({ name: "pinecone operation" });
    expect(determineSpanType(spanPinecone)).toBe("TOOL");

    const spanChroma = createMockSpan({ name: "chroma operation" });
    expect(determineSpanType(spanChroma)).toBe("TOOL");
  });

  it("should default to 'TOOL' for spans without specific patterns", () => {
    const span = createMockSpan({ name: "generic operation" });
    expect(determineSpanType(span)).toBe("TOOL");
  });
});
