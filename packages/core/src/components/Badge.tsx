import type { PropsWithChildren, ReactElement } from "react";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps extends PropsWithChildren {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export const Badge = ({
  children,
  variant = "primary",
  size = "md",
}: BadgeProps): ReactElement => {
  const variants = {
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full font-medium ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
