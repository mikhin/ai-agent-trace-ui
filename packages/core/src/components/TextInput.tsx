import cn from "classnames";
import { X } from "lucide-react";
import {
  useRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Callback fired when the input value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: ReactNode;

  /**
   * Callback fired when the clear button is clicked
   */
  onClear?: () => void;

  /**
   * Whether to show a clear button when input has value
   * @default false
   */
  clearable?: boolean;

  /**
   * Ref to the input element
   */
  ref?: RefObject<HTMLInputElement | null>;

  /**
   * Optional className for the input element
   */
  inputClassName?: string;

  /**
   * Unique identifier for the input (required)
   */
  id: string;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Whether to visually hide the label while keeping it for screen readers
   * @default false
   */
  hideLabel?: boolean;
}

const iconBaseClassName =
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-700 dark:text-gray-500";

export const TextInput = ({
  className,
  onChange,
  onValueChange,
  startIcon,
  onClear,
  clearable = true,
  ref,
  inputClassName,
  label,
  hideLabel = false,
  id,
  ...props
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(e.target.value);
  };

  const handleClear = () => {
    onClear?.();

    if (ref) {
      ref.current?.focus();
      return;
    }

    inputRef.current?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-gray-700 dark:text-gray-200",
            hideLabel && "sr-only",
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex w-full items-center justify-center",
          label && !hideLabel && "mt-1",
        )}
      >
        <input
          {...props}
          id={id}
          ref={ref || inputRef}
          onChange={handleChange}
          className={cn(
            inputClassName,
            "flex h-7 items-center truncate",
            "w-full px-2",
            !!startIcon && "pl-8",
            !!onClear && "pr-8",
            "rounded border border-gray-200 bg-transparent dark:border-gray-600",
            "text-gray-700 placeholder:text-gray-400 dark:text-gray-200 dark:placeholder:text-gray-600",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "outline-none outline-offset-0 focus-visible:outline-1 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-300",
          )}
        />
        {startIcon && (
          <div className={cn(iconBaseClassName, "left-2")} aria-hidden>
            {startIcon}
          </div>
        )}
        {onClear && clearable && (
          <button
            className={cn(iconBaseClassName, "right-2")}
            aria-label="Clear input value"
            onClick={handleClear}
            type="button"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
};
