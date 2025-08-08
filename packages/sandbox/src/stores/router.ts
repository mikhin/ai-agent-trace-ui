import { createRouter } from "@nanostores/router";

import { AgentTracesTestPage } from "../pages/AgentTracesTestPage";
import { BadgePage } from "../pages/BadgePage";
import { HomePage } from "../pages/HomePage";
import { OpenTelemetryAdaptersPage } from "../pages/OpenTelemetryAdaptersPage";
import { SpanCardPage } from "../pages/SpanCardPage";
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
  agentTracesTestPage: {
    path: "/agent-traces-test",
    component: AgentTracesTestPage,
    label: "Agent Traces Test",
  },
} as const;

export const routePaths = Object.entries(ROUTES).reduce(
  (paths, [key, config]) => ({ ...paths, [key]: config.path }),
  {},
) as Record<keyof typeof ROUTES, string>;

export const $router = createRouter(routePaths);
