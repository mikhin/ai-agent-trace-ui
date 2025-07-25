import type { ReactNode } from "react";

import { useState, useEffect } from "react";

import { Sidebar } from "./Sidebar.tsx";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-30 h-full w-80 shadow-sm md:relative md:z-10 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
        aria-label="Navigation menu"
        aria-hidden={!sidebarOpen ? "true" : undefined}
      >
        <div className="absolute inset-0 rounded-br-2xl rounded-tr-lg bg-white shadow-sm"></div>
        <div className="relative h-full">
          {/* Mobile close button */}
          <button
            className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
          <Sidebar onNavItemClick={closeSidebar} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-3 md:p-6">
        {/* Mobile menu button */}
        <button
          className="mb-4 rounded-lg bg-white px-3 py-2 text-gray-600 shadow-sm hover:text-gray-900 md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
        >
          <span aria-hidden="true">☰</span> Menu
        </button>

        <div className="mx-auto min-h-[calc(100%-1rem)] max-w-7xl rounded-lg bg-white p-3 shadow-sm md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
