import { type StatusCode } from "../types/open-telemetry";
import type { SpanStatus } from "../types/span";

export const mapSpanStatus = (statusCode?: StatusCode): SpanStatus => {
  switch (statusCode) {
    case "STATUS_CODE_OK":
      return "success";
    case "STATUS_CODE_ERROR":
      return "error";
    default:
      return "warning";
  }
};
