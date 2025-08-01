import { describe, expect, it } from "vitest";

import { SpanStatusCode } from "..";
import { mapSpanStatus } from "./map-span-status";

describe("mapSpanStatus", () => {
  it("should return 'success' for SpanStatusCode.OK", () => {
    expect(mapSpanStatus(SpanStatusCode.OK)).toBe("success");
  });

  it("should return 'error' for SpanStatusCode.ERROR", () => {
    expect(mapSpanStatus(SpanStatusCode.ERROR)).toBe("error");
  });

  it("should return 'warning' for SpanStatusCode.UNSET", () => {
    expect(mapSpanStatus(SpanStatusCode.UNSET)).toBe("warning");
  });

  it("should return 'warning' for unknown status codes", () => {
    expect(mapSpanStatus(999 as SpanStatusCode)).toBe("warning");
  });
});
