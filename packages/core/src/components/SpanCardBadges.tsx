import { Coins } from "lucide-react";

import type { TraceSpan } from "../types";

import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../utils/ui";
import { Badge } from "./Badge";

interface SpanCardBagdesProps {
  data: TraceSpan;
}

export const SpanCardBadges = ({ data }: SpanCardBagdesProps) => {
  const Icon = getSpanCategoryIcon(data.type);

  return (
    <div className="flex flex-wrap items-center justify-start gap-1">
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
    </div>
  );
};
