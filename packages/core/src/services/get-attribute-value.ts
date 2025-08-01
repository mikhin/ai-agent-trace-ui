import type { ReadableSpan } from "@opentelemetry/sdk-trace-base";

export const getAttributeValue = (
  span: ReadableSpan,
  key: string,
): string | number | boolean | undefined => {
  const value = span.attributes[key];

  // Handle OpenTelemetry AttributeValue type which can be string, number, boolean, array, or null
  if (value === null || value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    // Convert array to string representation
    return value.join(", ");
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  return undefined;
};
