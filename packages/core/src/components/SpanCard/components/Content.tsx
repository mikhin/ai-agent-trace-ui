import { Coins } from "lucide-react";
import type { SpanCardType } from "../../../types/span";
import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../../../utils/ui";
import { Badge } from "../../Badge";

interface SpanCardContentProps {
  data: SpanCardType;
}

export const SpanCardContent = ({ data }: SpanCardContentProps) => {
  const Icon = getSpanCategoryIcon(data.type);

  return (
    <div className="flex items-center">
      <h3 className="mr-3 max-w-32 truncate text-sm leading-5 text-gray-900 dark:text-gray-200">
        {data.title}
      </h3>

      <div className="flex items-center justify-start space-x-1">
        <Badge
          iconStart={<Icon className="size-2.5" />}
          theme={getSpanCategoryTheme(data.type)}
          size="xs"
        >
          {getSpanCategoryLabel(data.type)}
        </Badge>

        <Badge
          iconStart={<Coins className="size-2.5" />}
          theme="gray"
          size="xs"
        >
          {data.tokensCount}
        </Badge>

        <Badge theme="gray" size="xs">
          $ {data.cost}
        </Badge>
      </div>
    </div>
  );
};
