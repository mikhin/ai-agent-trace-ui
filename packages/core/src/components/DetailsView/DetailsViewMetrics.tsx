import { Coins } from "lucide-react";

import type { TraceSpan } from "../../types";

import { formatDuration } from "../../services/calculate-duration";
import { getDurationMs } from "../../services/get-duration-ms";
import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../../utils/ui";
import { Badge } from "../Badge";

interface DetailsViewMetricsProps {
  data: TraceSpan;
}

export const DetailsViewMetrics = ({ data }: DetailsViewMetricsProps) => {
  const Icon = getSpanCategoryIcon(data.type);
  const durationMs = getDurationMs(data);

  return (
    <div className="mb-4 flex items-center justify-start space-x-2">
      <Badge
        iconStart={<Icon className="size-2.5" />}
        theme={getSpanCategoryTheme(data.type)}
        size="xs"
      >
        {getSpanCategoryLabel(data.type)}
      </Badge>

      <Badge iconStart={<Coins className="size-2.5" />} theme="gray" size="xs">
        {data.tokensCount}
      </Badge>

      <Badge theme="gray" size="xs">
        $ {data.cost}
      </Badge>

      <span className="text-xs text-gray-500 dark:text-gray-600">
        LATENCY: {formatDuration(durationMs)}
      </span>
    </div>
  );
};
