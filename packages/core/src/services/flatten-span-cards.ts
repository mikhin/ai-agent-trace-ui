import type { SpanCardType } from "../types/span";

/**
 * Flattens a tree of SpanCardType objects into a single array
 * @param spans - Array of root spans that may contain children
 * @returns Flattened array of all spans
 */
export const flattenSpans = (spans: SpanCardType[]): SpanCardType[] => {
  const result: SpanCardType[] = [];

  const traverse = (items: SpanCardType[]) => {
    items.forEach((item) => {
      result.push(item);
      if (item.children?.length) {
        traverse(item.children);
      }
    });
  };

  traverse(spans);
  return result;
};
