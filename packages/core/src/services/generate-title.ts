import type { Span } from "../types/open-telemetry";

import {
  OPENTELEMETRY_GENAI_ATTRIBUTES,
  STANDARD_OPENTELEMETRY_ATTRIBUTES,
} from "../constants/span-mappings.ts";
import { getAttributeValue } from "./get-attribute-value.ts";

export const generateTitle = (span: Span): string => {
  const { name } = span;

  // For LLM operations, use model name
  const model = getAttributeValue(span, OPENTELEMETRY_GENAI_ATTRIBUTES.MODEL);

  if (model) {
    return `${model} - ${name}`;
  }

  // For vector DB operations, use collection name
  const collection = getAttributeValue(
    span,
    STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_COLLECTION,
  );
  const operation = getAttributeValue(
    span,
    STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_OPERATION,
  );

  if (collection && operation) {
    return `${collection} - ${operation}`;
  }

  // For HTTP operations, use method and URL
  const method = getAttributeValue(
    span,
    STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD,
  );
  const url = getAttributeValue(
    span,
    STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_URL,
  );

  if (method && url) {
    return `${method} ${url}`;
  }

  return name;
};
