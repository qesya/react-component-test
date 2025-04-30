import { useMemo } from "react";
import clsx from "clsx";
import { FaEllipsis } from "react-icons/fa6";

type MoodletType = "readonly" | "interactive";

export type MoodletVariant =
  | "primary"
  | "inactive"
  | "secondary"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "placeholder"
  | "disabled";

type MoodletClassMap = {
  [mode in MoodletType]: {
    [variant in MoodletVariant]: string;
  };
};

type MoodletProps = {
  content?: string;
  variant?: MoodletVariant;
  type?: MoodletType;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  ellipsis?: boolean;
  letter?: boolean;
};

export const Moodlet = ({
  content,
  variant = "primary",
  type = "readonly",
  iconLeft,
  iconRight,
  onClick,
  ellipsis,
  letter,
}: MoodletProps) => {
  const isInteractive = useMemo(
    () => type === "interactive" && variant !== "disabled",
    [type, variant]
  );

  const isIconOnly = useMemo(
    () => (iconLeft || iconRight) && !content,
    [content, iconLeft, iconRight]
  );

  return (
    <div
      className={clsx(
        classes.container,
        variantMap[type][variant],
        (isIconOnly || ellipsis) && classes.iconOnly,
        letter && classes.letter
      )}
      onClick={isInteractive ? onClick : undefined}
    >
      {(iconLeft || ellipsis) && <span>{ellipsis ? <FaEllipsis data-testid="ellipsis-icon" /> : iconLeft}</span>}
      {content && !ellipsis && (
        <span>{letter ? content.charAt(0) : content}</span>
      )}
      {iconRight && <span>{iconRight}</span>}
    </div>
  );
};

const classes = {
  container:
    "inline-flex items-center gap-1 px-2 py-0.5 text-sm font-medium rounded-full transition-colors duration-150",
  iconOnly: "w-6.5 h-6.5 !p-0 justify-center items-center",
  letter: "w-6.5 h-6.5 !p-0 justify-center items-center",
};

const variantMap: MoodletClassMap = {
  readonly: {
    primary: "bg-violet-200 border border-violet-600 text-violet-600",
    inactive: "bg-gray-200 border border-gray-500 text-gray-500",
    secondary: "bg-teal-100 border border-teal-500 text-teal-500",
    blue: "bg-sky-200 border border-sky-500 text-sky-500",
    green: "bg-green-200 border border-green-600 text-green-600",
    red: "bg-red-200 border border-red-600 text-red-600",
    yellow: "bg-yellow-100 border border-yellow-600 text-yellow-600",
    placeholder: "bg-violet-300 border border-violet-600 text-violet-600",
    disabled:
      "bg-violet-200 border border-violet-600 text-violet-600 opacity-50",
  },
  interactive: {
    primary: "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer",
    inactive: "bg-gray-400 hover:bg-gray-500 text-white cursor-pointer",
    secondary: "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer",
    blue: "bg-sky-500 hover:bg-sky-600 text-white cursor-pointer",
    green: "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
    red: "bg-red-600 hover:bg-red-700 text-white cursor-pointer",
    yellow: "bg-yellow-400 hover:bg-yellow-600 text-black cursor-pointer",
    placeholder: "",
    disabled: "",
  },
};
