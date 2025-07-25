import type { ReactNode } from "react";

interface SandboxItemProps {
  title?: string;
  children: ReactNode;
  pattern?: "grid" | "dots" | "none";
}

export function SandboxItem({
  title,
  children,
  pattern = "grid",
}: SandboxItemProps) {
  const patternClasses = {
    grid: "bg-[linear-gradient(#00000008_1px,transparent_1px),linear-gradient(90deg,#00000008_1px,transparent_1px)] bg-[size:20px_20px]",
    dots: "bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:15px_15px]",
    none: "",
  };

  return (
    <div className="flex flex-col gap-2">
      {title && <h3 className="text-sm font-medium text-gray-700">{title}</h3>}
      <div
        className={`rounded-md border border-gray-200 bg-gray-50 p-6 shadow-sm ${patternClasses[pattern]} `}
      >
        {children}
      </div>
    </div>
  );
}
