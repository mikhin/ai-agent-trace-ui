import type { Span } from "../types/open-telemetry.ts";

import {
  STANDARD_OPENTELEMETRY_ATTRIBUTES,
  STANDARD_OPENTELEMETRY_PATTERNS,
} from "../constants/span-mappings.ts";
import { getAttributeValue } from "../services/get-attribute-value.ts";

export const detectStandardOpenTelemetry = {
  isHttpCall: (span: Span): boolean => {
    return (
      getAttributeValue(span, STANDARD_OPENTELEMETRY_ATTRIBUTES.HTTP_METHOD) !==
      undefined
    );
  },

  isDatabaseCall: (span: Span): boolean => {
    return (
      getAttributeValue(span, STANDARD_OPENTELEMETRY_ATTRIBUTES.DB_SYSTEM) !==
      undefined
    );
  },

  isFunctionCall: (span: Span): boolean => {
    const name = span.name.toLowerCase();

    return (
      STANDARD_OPENTELEMETRY_PATTERNS.FUNCTION_KEYWORDS.some((keyword) =>
        name.includes(keyword),
      ) ||
      getAttributeValue(
        span,
        STANDARD_OPENTELEMETRY_ATTRIBUTES.FUNCTION_NAME,
      ) !== undefined
    );
  },

  isLLMCall: (span: Span): boolean => {
    const name = span.name.toLowerCase();

    return STANDARD_OPENTELEMETRY_PATTERNS.LLM_KEYWORDS.some((keyword) =>
      name.includes(keyword),
    );
  },

  isChainOperation: (span: Span): boolean => {
    const name = span.name.toLowerCase();

    return STANDARD_OPENTELEMETRY_PATTERNS.CHAIN_KEYWORDS.some((keyword) =>
      name.includes(keyword),
    );
  },

  isAgentOperation: (span: Span): boolean => {
    const name = span.name.toLowerCase();

    return STANDARD_OPENTELEMETRY_PATTERNS.AGENT_KEYWORDS.some((keyword) =>
      name.includes(keyword),
    );
  },

  isRetrievalOperation: (span: Span): boolean => {
    const name = span.name.toLowerCase();

    return STANDARD_OPENTELEMETRY_PATTERNS.RETRIEVAL_KEYWORDS.some((keyword) =>
      name.includes(keyword),
    );
  },
};
