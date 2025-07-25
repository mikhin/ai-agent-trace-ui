import type { ReactNode } from "react";

interface SandboxSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SandboxSection({
  title,
  description,
  children,
}: SandboxSectionProps) {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}
