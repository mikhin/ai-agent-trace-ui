import cn from "classnames";
import { Check, Ellipsis, Info, TriangleAlert } from "lucide-react";

import type { TraceSpanStatus } from "../types";

type StatusVariant = "dot" | "badge";

interface SpanCardStatusProps {
  status: TraceSpanStatus;
  variant?: StatusVariant;
}

const STATUS_COLORS_DOT: Record<TraceSpanStatus, string> = {
  success: "bg-green-500 dark:bg-green-500",
  error: "bg-red-500 dark:bg-red-500",
  pending: "bg-violet-500 dark:bg-violet-500",
  warning: "bg-yellow-500 dark:bg-yellow-500",
};

const STATUS_COLORS_BADGE: Record<TraceSpanStatus, string> = {
  success: "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400",
  error: "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400",
  pending:
    "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
  warning:
    "bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400",
};

export const SpanCardStatus = ({
  status,
  variant = "dot",
}: SpanCardStatusProps) => {
  const title = `Status: ${status}`;

  return (
    <div className="flex size-4 items-center justify-center">
      {variant === "dot" ? (
        <SpanCardStatusDot status={status} title={title} />
      ) : (
        <SpanCardStatusBadge status={status} title={title} />
      )}
    </div>
  );
};

interface SpanCardStatusWithTitleProps extends SpanCardStatusProps {
  title: string;
}

const SpanCardStatusDot = ({ status, title }: SpanCardStatusWithTitleProps) => {
  return (
    <span
      className={cn("block size-1.5 rounded-full", STATUS_COLORS_DOT[status])}
      aria-label={title}
      title={title}
    />
  );
};

const SpanCardStatusBadge = ({
  status,
  title,
}: SpanCardStatusWithTitleProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "h-3.5 w-4 rounded",
        STATUS_COLORS_BADGE[status],
      )}
      aria-label={title}
      title={title}
    >
      {status === "success" && <Check className="size-2.5" aria-hidden />}
      {status === "error" && <TriangleAlert className="size-2.5" aria-hidden />}
      {status === "warning" && <Info className="size-2.5" aria-hidden />}
      {status === "pending" && <Ellipsis className="size-2.5" aria-hidden />}
    </span>
  );
};
