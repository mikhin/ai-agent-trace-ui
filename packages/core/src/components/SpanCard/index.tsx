import * as Collapsible from "@radix-ui/react-collapsible";
import {
  useState,
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import type { SpanCardType } from "../../types/span";

import { getSpanCategoryTheme } from "../../utils/ui";
import { Avatar, type AvatarProps } from "../Avatar";
import { SpanCardTimeline } from "./components/Timeline";
import { SpanCardStatus } from "./components/Status";
import { SpanCardContent } from "./components/Content";
import { SpanCardToggle } from "./components/Toggle";
import {
  SpanCardHorizaontalConnector,
  SpanCardVerticalConnector,
} from "./components/Connectors";

const LAYOUT_CONSTANTS = {
  MARGIN_LEVEL_STEP: 20,
  BASE_HORIZONTAL_LINE_WIDTH: 8,
  CONTENT_BASE_WIDTH: 300,
} as const;

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
      <SpanCardVerticalConnector />

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
          <SpanCardHorizaontalConnector
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
