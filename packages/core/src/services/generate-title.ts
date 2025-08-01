import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

import { LLM_ATTRIBUTES, VECTOR_DB_ATTRIBUTES } from "../constants.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const generateTitle = (span: ReadableSpan): string => {
  const { name } = span;

  // For LLM operations, use model name
  const model = getAttributeValue(span, LLM_ATTRIBUTES.MODEL);

  if (model) {
    return `${model} - ${name}`;
  }

  // For vector DB operations, use collection name
  const collection = getAttributeValue(span, VECTOR_DB_ATTRIBUTES.COLLECTION);
  const operation = getAttributeValue(span, VECTOR_DB_ATTRIBUTES.OPERATION);

  if (collection && operation) {
    return `${collection} - ${operation}`;
  }

  // For HTTP operations, use method and URL
  const method = getAttributeValue(span, "http.method");
  const url = getAttributeValue(span, "http.url");

  if (method && url) {
    return `${method} ${url}`;
  }

  return name;
};
