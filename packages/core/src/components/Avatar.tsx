import type { ReactElement } from "react";

import type { ColorVariant } from "../types";

import { roundedClasses } from "../constants/ui";

const sizeClasses = {
  xs: "w-4 h-4 text-xs",
  sm: "w-5 h-5 text-sm",
  md: "w-8 h-8 text-base",
  lg: "w-10 h-10 text-lg",
  xl: "w-12 h-12 text-xl",
};

const textSizeClasses = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const bgColorClasses: Record<ColorVariant, string> = {
  gray: "bg-gray-600",
  red: "bg-red-600",
  orange: "bg-orange-600",
  yellow: "bg-yellow-600",
  teal: "bg-teal-600",
  indigo: "bg-indigo-600",
  purple: "bg-purple-600",
  sky: "bg-sky-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
};

export type AvatarProps = {
  /**
   * The image source for the avatar
   */
  src?: string;
  /**
   * The alt text for the avatar
   */
  alt?: string;
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The border radius of the avatar
   * @default "full"
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * Background color theme for the letter avatar
   * Uses the unified color theme system
   * @default "gray"
   */
  bgColor?: ColorVariant;
  /**
   * Text color for the letter avatar
   * @default "white"
   */
  textColor?: "white" | "black";
  /**
   * Custom letter to display (will use first letter of alt if not provided)
   */
  letter?: string;
  /**
   * Optional className for additional styling
   */
  className?: string;
};

export const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  rounded = "full",
  bgColor = "gray",
  textColor = "white",
  letter,
  className = "",
}: AvatarProps): ReactElement => {
  const displayLetter = letter ? letter.charAt(0) : alt.charAt(0).toUpperCase();

  const actualTextColor = textColor === "white" ? "text-white" : "text-black";

  return (
    <div
      className={`overflow-hidden ${sizeClasses[size]} ${textSizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${bgColorClasses[bgColor]} ${actualTextColor} font-medium`}
        >
          {displayLetter}
        </div>
      )}
    </div>
  );
};
