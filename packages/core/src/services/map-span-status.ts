import { SpanStatusCode } from "@opentelemetry/api";

export const mapSpanStatus = (
  statusCode: SpanStatusCode,
): "success" | "error" | "running" | "warning" => {
  switch (statusCode) {
    case SpanStatusCode.OK:
      return "success";
    case SpanStatusCode.ERROR:
      return "error";
    default:
      return "warning";
  }
};
