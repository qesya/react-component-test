// components/FSC.tsx
import clsx from "clsx";
import { useState } from "react";

type FSCProps = {
  letter?: boolean;
};

enum FSCState {
  NotRequired = "not required",
  Required = "required",
  Current = "current",
  Completed = "completed",
}

const leftClickStateCycle = {
  [FSCState.NotRequired]: FSCState.NotRequired,
  [FSCState.Required]: FSCState.Current,
  [FSCState.Current]: FSCState.Completed,
  [FSCState.Completed]: FSCState.Current,
};

const COLORS: Record<FSCState, string> = {
  "not required": "bg-gray-100 text-gray-400 border border-gray-300",
  required: "bg-violet-100 text-violet-600 border border-violet-300",
  current: "bg-red-600 text-white border border-red-700",
  completed: "bg-green-600 text-white border border-green-700",
};

const LABELS = ["FUELLING", "SERVICING", "CLEANING"];

export function FSC({ letter }: FSCProps) {
  const [states, setStates] = useState<FSCState[]>([
    FSCState.Required,
    FSCState.Required,
    FSCState.Required,
  ]);

  const handleLeftClick = (index: number) => {
    setStates((prev) =>
      prev.map((state, i) => (i === index ? leftClickStateCycle[state] : state))
    );
  };

  const handleRightClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setStates((prev) =>
      prev.map((state, i) => {
        if (i === index) {
          return state === FSCState.Required
            ? FSCState.NotRequired
            : FSCState.Required;
        }
        return state;
      })
    );
  };

  return (
    <div className={classes.container}>
      {LABELS.map((label, i) => (
        <button
          key={i}
          onClick={() => handleLeftClick(i)}
          onContextMenu={(e) => handleRightClick(i, e)}
          className={clsx(classes.button, COLORS[states[i]])}
        >
          {letter ? label.charAt(0) : label}
        </button>
      ))}
    </div>
  );
}

const classes = {
  container: "flex gap-2",
  button:
    "inline-flex items-center gap-1 px-2 py-0.5 text-sm font-medium rounded-full transition-colors duration-150",
};
