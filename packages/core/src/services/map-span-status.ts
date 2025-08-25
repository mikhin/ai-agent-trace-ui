import type { TraceSpanStatus } from "../types";

import { type StatusCode } from "../types/open-telemetry";

export const mapSpanStatus = (statusCode?: StatusCode): TraceSpanStatus => {
  switch (statusCode) {
    case "STATUS_CODE_OK":
      return "success";
    case "STATUS_CODE_ERROR":
      return "error";
    default:
      return "warning";
  }
};
