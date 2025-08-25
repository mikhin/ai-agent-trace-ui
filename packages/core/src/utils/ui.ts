import type { LucideIcon } from "lucide-react";

import type { ColorVariant, TraceSpanCategory } from "../types";

import { colorThemeClasses, spanCategoryConfig } from "../constants/ui.ts";

export function getBgColorClass(color: ColorVariant): string {
  return colorThemeClasses[color].bg;
}

export function getSpanCategoryTheme(
  category: TraceSpanCategory,
): ColorVariant {
  return spanCategoryConfig[category].theme;
}

export function getSpanCategoryLabel(category: TraceSpanCategory): string {
  return spanCategoryConfig[category].label;
}

export function getSpanCategoryIcon(category: TraceSpanCategory): LucideIcon {
  return spanCategoryConfig[category].icon;
}
