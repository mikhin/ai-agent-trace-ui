import type { ButtonHTMLAttributes } from "react";

import cn from "classnames";

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "default" | "ghost";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the icon button
   */
  size?: IconButtonSize;

  /**
   * The visual variant of the icon button
   */
  variant?: IconButtonVariant;

  /**
   * Accessible label for screen readers
   * Required for accessibility compliance
   */
  "aria-label": string;
}

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "h-5 min-h-5",
  md: "h-6 min-h-6",
  lg: "h-7 min-h-7",
};

const variantClasses: Record<IconButtonVariant, string> = {
  default: "rounded border border-gray-200 bg-transparent dark:border-gray-600",
  ghost: "rounded bg-transparent",
};

// TODO: Remake to call Icon component directly instead of passing children
export const IconButton = ({
  children,
  className,
  size = "md",
  variant = "default",
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      {...props}
      className={cn(
        className,
        sizeClasses[size],
        "inline-flex aspect-square shrink-0 items-center justify-center",
        variantClasses[variant],
        "text-gray-500 dark:text-gray-400",
        "hover:bg-gray-200 dark:hover:bg-gray-800",
      )}
    >
      {children}
    </button>
  );
};
