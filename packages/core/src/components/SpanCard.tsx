import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, Coins } from "lucide-react";
import {
  useState,
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import type { SpanCardType } from "../types/span";
import type { ColorVariant } from "../types/ui.ts";

import { formatDuration } from "../services/calculate-duration.ts";
import {
  getSpanCategoryIcon,
  getSpanCategoryLabel,
  getSpanCategoryTheme,
} from "../utils/ui";
import { Avatar, type AvatarProps } from "./Avatar";
import { Badge } from "./Badge";

const LAYOUT_CONSTANTS = {
  MARGIN_LEVEL_STEP: 20,
  BASE_HORIZONTAL_LINE_WIDTH: 8,
  CONTENT_BASE_WIDTH: 300,
} as const;

const STATUS_COLORS = {
  success: "bg-green-500 dark:bg-green-700",
  error: "bg-red-500 dark:bg-red-700",
  running: "bg-violet-500 dark:bg-violet-700",
  warning: "bg-yellow-500 dark:bg-yellow-700",
} as const;

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

interface SpanCardProps {
  data: SpanCardType;
  level?: number;
  selectedCardId?: string;
  avatar?: AvatarProps;
  onSelectionChange?: (cardId: string, isSelected: boolean) => void;
  expandButton: "inside" | "outside";
  minStart: number;
  maxEnd: number;
}

interface LayoutCalculations {
  marginLeft: number;
  horizontalLineWidth: number;
  contentWidth: number;
}

interface SpanCardState {
  isExpanded: boolean;
  hasChildren: boolean;
  isSelected: boolean;
}

const calculateLayout = (
  level: number,
  hasChildren: boolean,
): LayoutCalculations => {
  const marginLeft = level !== 0 ? LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP : 0;
  const horizontalLineWidth =
    LAYOUT_CONSTANTS.BASE_HORIZONTAL_LINE_WIDTH +
    (hasChildren ? 0 : LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP);
  const contentWidth =
    LAYOUT_CONSTANTS.CONTENT_BASE_WIDTH -
    level * LAYOUT_CONSTANTS.MARGIN_LEVEL_STEP;

  return { marginLeft, horizontalLineWidth, contentWidth };
};

const getGridConfig = (
  expandButton: "inside" | "outside",
  hasAvatar: boolean,
  contentWidth: number,
) => {
  if (expandButton === "inside") {
    return {
      gridTemplateAreas: hasAvatar
        ? "'toggle avatar content status'"
        : "'toggle content timeline status'",
      gridTemplateColumns: hasAvatar
        ? `12px 16px ${contentWidth}px auto`
        : `12px ${contentWidth}px auto 6px`,
    };
  }

  return {
    gridTemplateAreas: hasAvatar
      ? "'avatar content status timeline expand'"
      : "'content status timeline expand'",
    gridTemplateColumns: hasAvatar
      ? `16px ${contentWidth}px 6px auto 12px`
      : `${contentWidth}px 6px auto 12px`,
  };
};

const getStatusColor = (status: keyof typeof STATUS_COLORS): string => {
  return STATUS_COLORS[status] || "bg-gray-500";
};

const useSpanCardEventHandlers = (
  data: SpanCardType,
  isSelected: boolean,
  onSelectionChange?: (cardId: string, isSelected: boolean) => void,
) => {
  const handleCardClick = useCallback((): void => {
    onSelectionChange?.(data.id, !isSelected);
  }, [data.id, isSelected, onSelectionChange]);

  const handleChildSelectionChange = useCallback(
    (childId: string, childIsSelected: boolean): void => {
      onSelectionChange?.(childId, childIsSelected);
    },
    [onSelectionChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  const handleToggleClick = useCallback(
    (e: MouseEvent | KeyboardEvent): void => {
      e.stopPropagation();
    },
    [],
  );

  return {
    handleCardClick,
    handleChildSelectionChange,
    handleKeyDown,
    handleToggleClick,
  };
};

const SpanCardToggle: FC<{
  isExpanded: boolean;
  title: string;
  onToggleClick: (e: MouseEvent | KeyboardEvent) => void;
}> = ({ isExpanded, title, onToggleClick }) => (
  <Collapsible.Trigger asChild>
    <button
      className="flex size-3 items-center justify-center"
      onClick={onToggleClick}
      onKeyDown={onToggleClick}
      aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title} children`}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown aria-hidden="true" className="text-gray-500" />
      ) : (
        <ChevronRight aria-hidden="true" className="text-gray-500" />
      )}
    </button>
  </Collapsible.Trigger>
);

const SpanCardContent: FC<{
  data: SpanCardType;
}> = ({ data }) => {
  const Icon = getSpanCategoryIcon(data.type);

  return (
    <div className="flex items-center">
      <h3 className="mr-3 max-w-32 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5">
        {data.title}
      </h3>

      <div className="flex items-center justify-start space-x-1">
        <Badge
          iconStart={<Icon className="h-3 w-3" />}
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

const SpanCardTimeline: FC<{
  startTime: Date;
  endTime: Date;
  minStart: number;
  maxEnd: number;
  theme: ColorVariant;
}> = ({ startTime, endTime, minStart, maxEnd, theme }) => {
  const startMs = +startTime;
  const endMs = +endTime;
  const totalRange = maxEnd - minStart;
  const startPercent = ((startMs - minStart) / totalRange) * 100;
  const widthPercent = ((endMs - startMs) / totalRange) * 100;

  return (
    <span className="flex w-full items-center">
      <span className="relative h-3.5 flex-1 rounded bg-gray-100 px-1">
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
      <span className="ml-2 w-10 whitespace-nowrap text-right text-xs">
        {formatDuration(endMs - startMs)}
      </span>
    </span>
  );
};

const SpanCardStatus: FC<{
  status: keyof typeof STATUS_COLORS;
}> = ({ status }) => {
  const statusColor = getStatusColor(status);

  return (
    <span
      className={`block size-1.5 rounded-full ${statusColor}`}
      aria-label={`Status: ${status}`}
      title={`Status: ${status}`}
    />
  );
};

const SpanCardConnector: FC<{
  level: number;
  horizontalLineWidth: number;
}> = ({ level, horizontalLineWidth }) => {
  if (level === 0) return null;

  return (
    <div
      className="absolute -left-[15px] top-2.5 h-0.5 bg-gray-100"
      style={{ width: `${horizontalLineWidth}px` }}
    />
  );
};

const SpanCardChildren: FC<{
  expandButton: "inside" | "outside";
  data: SpanCardType;
  level: number;
  selectedCardId?: string;
  onChildSelectionChange: (childId: string, childIsSelected: boolean) => void;
  minStart: number;
  maxEnd: number;
}> = ({
  data,
  level,
  selectedCardId,
  onChildSelectionChange,
  expandButton,
  minStart,
  maxEnd,
}) => {
  if (!data.children?.length) return null;

  return (
    <div className="relative">
      <div className="absolute -top-3 ml-1 h-[calc(100%-9px)] w-0.5 translate-x-1/2 transform bg-gray-100" />

      <Collapsible.Content>
        <ul role="group">
          {data.children.map((child) => (
            <SpanCard
              expandButton={expandButton}
              key={child.id}
              data={child}
              minStart={minStart}
              maxEnd={maxEnd}
              level={level + 1}
              selectedCardId={selectedCardId}
              onSelectionChange={onChildSelectionChange}
            />
          ))}
        </ul>
      </Collapsible.Content>
    </div>
  );
};

export const SpanCard: FC<SpanCardProps> = ({
  data,
  level = 0,
  selectedCardId,
  onSelectionChange,
  expandButton,
  avatar,
  minStart,
  maxEnd,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const state: SpanCardState = {
    isExpanded,
    hasChildren: Boolean(data.children?.length),
    isSelected: selectedCardId === data.id,
  };

  const layout = calculateLayout(level, state.hasChildren);
  const gridConfig = getGridConfig(
    expandButton,
    Boolean(avatar),
    layout.contentWidth,
  );

  const eventHandlers = useSpanCardEventHandlers(
    data,
    state.isSelected,
    onSelectionChange,
  );

  return (
    <li
      role="treeitem"
      aria-expanded={state.hasChildren ? state.isExpanded : undefined}
      className="list-none"
    >
      <Collapsible.Root
        open={state.isExpanded}
        onOpenChange={setIsExpanded}
        style={{ marginLeft: `${layout.marginLeft}px` }}
      >
        <div
          className="relative box-content grid h-5 w-full cursor-pointer items-center gap-2 pb-3"
          style={{
            gridTemplateAreas: gridConfig.gridTemplateAreas,
            gridTemplateColumns: gridConfig.gridTemplateColumns,
          }}
          onClick={eventHandlers.handleCardClick}
          onKeyDown={eventHandlers.handleKeyDown}
          tabIndex={0}
          role="button"
          aria-pressed={state.isSelected}
          aria-describedby={`span-card-desc-${data.id}`}
          aria-expanded={state.hasChildren ? state.isExpanded : undefined}
          aria-label={`${state.isSelected ? "Selected" : "Not selected"} span card for ${data.title} at level ${level}`}
        >
          <SpanCardConnector
            level={level}
            horizontalLineWidth={layout.horizontalLineWidth}
          />

          {expandButton === "inside" &&
            (state.hasChildren ? (
              <div style={{ gridArea: "toggle" }}>
                <SpanCardToggle
                  isExpanded={state.isExpanded}
                  title={data.title}
                  onToggleClick={eventHandlers.handleToggleClick}
                />
              </div>
            ) : (
              <div
                className="w-3"
                style={{ gridArea: "toggle" }}
                aria-hidden="true"
              />
            ))}

          {avatar && (
            <div style={{ gridArea: "avatar" }}>
              <Avatar {...avatar} />
            </div>
          )}

          <div style={{ gridArea: "content" }}>
            <SpanCardContent data={data} />
          </div>

          {expandButton === "outside" && (
            <div style={{ gridArea: "status" }}>
              <SpanCardStatus status={data.status} />
            </div>
          )}

          <div style={{ gridArea: "timeline" }}>
            <SpanCardTimeline
              theme={getSpanCategoryTheme(data.type)}
              startTime={data.startTime}
              endTime={data.endTime}
              minStart={minStart}
              maxEnd={maxEnd}
            />
          </div>

          {expandButton === "inside" && (
            <div style={{ gridArea: "status" }}>
              <SpanCardStatus status={data.status} />
            </div>
          )}

          {expandButton === "outside" &&
            (state.hasChildren ? (
              <div style={{ gridArea: "expand" }}>
                <SpanCardToggle
                  isExpanded={state.isExpanded}
                  title={data.title}
                  onToggleClick={eventHandlers.handleToggleClick}
                />
              </div>
            ) : (
              <div
                className="w-3"
                style={{ gridArea: "expand" }}
                aria-hidden="true"
              />
            ))}
        </div>

        <SpanCardChildren
          minStart={minStart}
          maxEnd={maxEnd}
          expandButton={expandButton}
          data={data}
          level={level}
          selectedCardId={selectedCardId}
          onChildSelectionChange={eventHandlers.handleChildSelectionChange}
        />
      </Collapsible.Root>
    </li>
  );
};
