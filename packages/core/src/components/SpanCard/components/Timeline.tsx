import { formatDuration } from "../../../services/calculate-duration";
import type { ColorVariant } from "../../../types/ui";

interface SpanCardTimelineProps {
  startTime: Date;
  endTime: Date;
  minStart: number;
  maxEnd: number;
  theme: ColorVariant;
}

const timelineBgColors: Record<ColorVariant, string> = {
  purple: "bg-purple-400 dark:bg-purple-600",
  indigo: "bg-indigo-400 dark:bg-indigo-600",
  orange: "bg-orange-400 dark:bg-orange-600",
  teal: "bg-teal-400 dark:bg-teal-600",
  cyan: "bg-cyan-400 dark:bg-cyan-600",
  sky: "bg-sky-400 dark:bg-sky-600",
  yellow: "bg-yellow-400 dark:bg-yellow-600",
  emerald: "bg-emerald-400 dark:bg-emerald-600",
  red: "bg-red-400 dark:bg-red-600",
  gray: "bg-gray-400 dark:bg-gray-600",
};

export const SpanCardTimeline = ({
  startTime,
  endTime,
  minStart,
  maxEnd,
  theme,
}: SpanCardTimelineProps) => {
  const startMs = +startTime;
  const endMs = +endTime;
  const totalRange = maxEnd - minStart;
  const durationMs = endMs - startMs;
  const startPercent = ((startMs - minStart) / totalRange) * 100;
  const widthPercent = (durationMs / totalRange) * 100;

  return (
    <span className="flex w-full items-center">
      <span className="relative h-4 flex-1 rounded bg-gray-200 px-1 dark:bg-gray-900">
        <span className="pointer-events-none absolute inset-x-1 top-1/2 h-1.5 -translate-y-1/2">
          <span
            className={`absolute h-full rounded-sm ${timelineBgColors[theme]}`}
            style={{
              left: `${startPercent}%`,
              width: `${widthPercent}%`,
            }}
          />
        </span>
      </span>
      <span className="ml-2 w-10 whitespace-nowrap text-right text-xs text-black dark:text-white">
        {formatDuration(durationMs)}
      </span>
    </span>
  );
};
