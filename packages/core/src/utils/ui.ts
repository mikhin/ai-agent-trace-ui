import type { LucideIcon } from "lucide-react";

import type { SpanCategory } from "../types/span.ts";
import type { ColorVariant } from "../types/ui.ts";

import { colorThemeClasses, spanCategoryConfig } from "../constants/ui.ts";

export function getBgColorClass(color: ColorVariant): string {
  return colorThemeClasses[color].bg;
}

export function getSpanCategoryTheme(category: SpanCategory): ColorVariant {
  return spanCategoryConfig[category].theme;
}

export function getSpanCategoryLabel(category: SpanCategory): string {
  return spanCategoryConfig[category].label;
}

export function getSpanCategoryIcon(category: SpanCategory): LucideIcon {
  return spanCategoryConfig[category].icon;
}
