import { createRouter } from "@nanostores/router";

import { BadgePage } from "../pages/BadgePage";
import { HomePage } from "../pages/HomePage";
import { OpenTelemetryAdaptersPage } from "../pages/OpenTelemetryAdaptersPage";
import { SpanCardPage } from "../pages/SpanCardPage";
import { SpanCardsListPage } from "../pages/SpanCardsListPage";
import { TreeViewPage } from "../pages/TreeViewPage";

export type RouteKey = keyof typeof ROUTES;

export const ROUTES = {
  home: {
    path: "/",
    component: HomePage,
    label: "Home",
  },
  badge: {
    path: "/badge",
    component: BadgePage,
    label: "Badge",
  },
  spanCard: {
    path: "/span-card",
    component: SpanCardPage,
    label: "Span Card",
  },
  spanCardsList: {
    path: "/span-cards-list",
    component: SpanCardsListPage,
    label: "Span Cards List",
  },
  treeView: {
    path: "/tree-view",
    component: TreeViewPage,
    label: "Tree View",
  },
  data: {
    path: "/open-telemetry-adapters-page",
    component: OpenTelemetryAdaptersPage,
    label: "OpenTelemetry Adapters",
  },
} as const;

export const routePaths = Object.entries(ROUTES).reduce(
  (paths, [key, config]) => ({ ...paths, [key]: config.path }),
  {},
) as Record<keyof typeof ROUTES, string>;

export const $router = createRouter(routePaths);
