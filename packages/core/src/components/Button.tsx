import type { FC, PropsWithChildren, ReactElement } from "react";

import type { ColorVariant } from "../types";

import { roundedClasses } from "../constants/ui";

const BASE_CLASSES =
  "inline-flex items-center justify-center font-medium transition-all duration-200";

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
};

const filledThemeClasses: Record<ColorVariant, string> = {
  gray: "text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-200",
  purple: "text-gray-900 bg-purple-100 dark:bg-purple-600 dark:text-gray-200",
  indigo: "text-gray-900 bg-indigo-100 dark:bg-indigo-600 dark:text-gray-200",
  orange: "text-gray-900 bg-orange-100 dark:bg-orange-600 dark:text-gray-200",
  teal: "text-gray-900 bg-teal-100 dark:bg-teal-600 dark:text-gray-200",
  cyan: "text-gray-900 bg-cyan-100 dark:bg-cyan-600 dark:text-gray-200",
  sky: "text-gray-900 bg-sky-100 dark:bg-sky-600 dark:text-gray-200",
  yellow: "text-gray-900 bg-yellow-100 dark:bg-yellow-600 dark:text-gray-200",
  emerald:
    "text-gray-900 bg-emerald-100 dark:bg-emerald-600 dark:text-gray-200",
  red: "text-gray-900 bg-red-100 dark:bg-red-600 dark:text-gray-200",
};

const variantClasses = {
  filled: "",
  outlined:
    "border border-2 bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600",
  ghost: "bg-transparent text-gray-600 dark:text-gray-300",
};

export type ButtonProps = {
  /**
   * The content of the button
   */
  children: React.ReactNode;

  /**
   * The size of the button
   * @default "xs"
   */
  size?: "xs";

  /**
   * The color theme of the button
   * @default "gray"
   */
  theme?: ColorVariant;

  /**
   * The border radius of the button
   * @default "md"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * The visual variant of the button
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "ghost";

  /**
   * Makes the button full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Disables the button
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional icon to display at the start of the button
   */
  iconStart?: ReactElement;

  /**
   * Optional icon to display at the end of the button
   */
  iconEnd?: ReactElement;

  /**
   * The button type attribute
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Click handler function
   */
  onClick?: () => void;

  /**
   * Optional className for additional styling
   */
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  size = "xs",
  theme = "gray",
  rounded = "md",
  variant = "filled",
  fullWidth = false,
  disabled = false,
  iconStart,
  iconEnd,
  type = "button",
  onClick,
  className = "",
}) => {
  const widthClass = fullWidth ? "w-full" : "";
  const stateClasses = disabled
    ? "cursor-not-allowed opacity-50"
    : "hover:opacity-70";
  const filledThemeClass =
    variant === "filled"
      ? filledThemeClasses[theme] || filledThemeClasses.gray
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_CLASSES} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${filledThemeClass} ${widthClass} ${stateClasses} ${className}`}
    >
      {iconStart && <span className="mr-1">{iconStart}</span>}
      {children}
      {iconEnd && <span className="ml-1">{iconEnd}</span>}
    </button>
  );
};
