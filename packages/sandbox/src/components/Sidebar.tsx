import { useStore } from "@nanostores/react";
import { openPage } from "@nanostores/router";

import { $router, ROUTES, type RouteKey } from "../stores/router";

type Props = {
  onNavItemClick: (routeKey: RouteKey) => void;
};

export function Sidebar({ onNavItemClick }: Props) {
  const page = useStore($router);
  const currentRoute = page?.route as RouteKey | undefined;

  const getRouteLabel = (routeKey: RouteKey): string => {
    const routeConfig = ROUTES[routeKey];
    return routeConfig.label;
  };

  const handleNavItemClick = (routeKey: RouteKey) => {
    onNavItemClick(routeKey);
    openPage($router, routeKey);
  };

  return (
    <nav
      className="h-full bg-gradient-to-b from-gray-50 to-gray-100 p-4 pt-12 md:pt-4"
      aria-label="Main navigation"
      id="sidebar"
      role="navigation"
    >
      <ul className="space-y-2" role="list">
        {Object.entries(ROUTES).map(([key]) => {
          const routeKey = key as RouteKey;
          const isActive = currentRoute === routeKey;

          return (
            <li key={routeKey} role="listitem">
              <button
                className={`group w-full rounded-lg px-3 py-3 text-left text-base md:py-2 md:text-sm ${
                  isActive
                    ? "bg-white font-medium text-gray-700 shadow-sm"
                    : "text-gray-500 hover:bg-white/60 hover:shadow-sm"
                }`}
                onClick={() => handleNavItemClick(routeKey)}
                aria-current={isActive ? "page" : undefined}
                type="button"
              >
                <div className="flex items-center">
                  {getRouteLabel(routeKey)}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
