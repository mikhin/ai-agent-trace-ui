import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import { LLM_ATTRIBUTES, VECTOR_DB_ATTRIBUTES } from "../constants.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const determineSpanType = (
  span: ReadableSpan,
): "LLM" | "TOOL" | "CHAIN" | "AGENT" => {
  const { name } = span;

  // Check for LLM operations
  if (getAttributeValue(span, LLM_ATTRIBUTES.MODEL)) {
    return "LLM";
  }

  // Check for tool/function calls
  if (
    name.toLowerCase().includes("tool") ||
    name.toLowerCase().includes("function") ||
    getAttributeValue(span, "function.name")
  ) {
    return "TOOL";
  }

  // Check for chain operations (LangChain, etc.)
  if (
    name.toLowerCase().includes("chain") ||
    name.toLowerCase().includes("workflow") ||
    getAttributeValue(span, "langchain.chain")
  ) {
    return "CHAIN";
  }

  // Check for agent operations
  if (
    name.toLowerCase().includes("agent") ||
    getAttributeValue(span, "agent.name")
  ) {
    return "AGENT";
  }

  // Check for vector database operations - classify as TOOL
  if (getAttributeValue(span, VECTOR_DB_ATTRIBUTES.OPERATION)) {
    return "TOOL";
  }

  // Check for HTTP operations - classify as TOOL
  if (getAttributeValue(span, "http.method")) {
    return "TOOL";
  }

  // Check for database operations - classify as TOOL
  if (getAttributeValue(span, "db.system")) {
    return "TOOL";
  }

  // Fallback based on span name patterns
  if (
    name.toLowerCase().includes("openai") ||
    name.toLowerCase().includes("anthropic")
  ) {
    return "LLM";
  }

  if (
    name.toLowerCase().includes("pinecone") ||
    name.toLowerCase().includes("chroma")
  ) {
    return "TOOL";
  }

  // Default fallback
  return "TOOL";
};
