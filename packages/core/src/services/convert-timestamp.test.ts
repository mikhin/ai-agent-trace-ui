import { describe, expect, it } from "vitest";

import { convertTimestamp } from "./convert-timestamp";

describe("convertTimestamp", () => {
  it("should convert high-resolution timestamp to a Date object", () => {
    const hrTime: [number, number] = [1697097600, 500000000]; // 1697097600 seconds and 500ms

    const date = convertTimestamp(hrTime);

    expect(date).toBeInstanceOf(Date);

    expect(date.getTime()).toBe(1697097600500); // Validate correct timestamp in milliseconds
  });

  it("should handle timestamps with only seconds (no nanoseconds)", () => {
    const hrTime: [number, number] = [1697097600, 0]; // 1697097600 seconds

    const date = convertTimestamp(hrTime);

    expect(date).toBeInstanceOf(Date);

    expect(date.getTime()).toBe(1697097600000);
  });

  it("should handle timestamps with only nanoseconds (no full seconds)", () => {
    const hrTime: [number, number] = [0, 500000000]; // 0 seconds and 500ms

    const date = convertTimestamp(hrTime);

    expect(date).toBeInstanceOf(Date);

    expect(date.getTime()).toBe(500);
  });

  it("should handle timestamps with zero seconds and zero nanoseconds", () => {
    const hrTime: [number, number] = [0, 0]; // 0 seconds and 0 nanoseconds

    const date = convertTimestamp(hrTime);

    expect(date).toBeInstanceOf(Date);

    expect(date.getTime()).toBe(0);
  });
});
