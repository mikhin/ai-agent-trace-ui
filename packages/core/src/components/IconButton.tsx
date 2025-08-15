import type { ButtonHTMLAttributes } from "react";
import cn from "classnames";

type IconButtonSize = "md";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
}

const sizeClasses: Record<IconButtonSize, string> = {
  md: "h-7 min-h-7",
};

export const IconButton = ({
  children,
  className,
  size = "md",
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        className,
        sizeClasses[size],
        "inline-flex aspect-square shrink-0 items-center justify-center",
        "rounded border border-gray-200 bg-transparent dark:border-gray-800",
        "text-gray-500 dark:text-gray-400",
        "hover:bg-gray-200 dark:hover:bg-gray-800",
        "outline-none outline-offset-0 focus-visible:outline-1 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300",
      )}
    >
      {children}
    </button>
  );
};
