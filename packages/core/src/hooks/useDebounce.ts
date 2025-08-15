import { useEffect, useState } from "react";

/**
 * A hook that debounces a value, only updating it after a specified delay has passed.
 * Useful for search inputs, API calls, or any operation that should be delayed.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds before updating the debounced value
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * // debouncedSearchTerm will only update 300ms after searchTerm stops changing
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search API call
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
