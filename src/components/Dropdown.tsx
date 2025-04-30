import React, { useState, useRef, useEffect } from "react";
import { Moodlet } from "./Moodlet";

type DropdownProps = {
  options: Option[];
  selectedId?: string;
  onSelect: (id: string) => void;
  placeholder?: string;
};

type Option = {
  id: string;
  label: string;
  disabled?: boolean;
  moodletProps?: React.ComponentProps<typeof Moodlet>;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedId,
  onSelect,
  placeholder = "Text options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={classes.container}>
      <div
        className={classes.inputButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={classes.inputButtonWrapper}>
          {selectedOption ? (
            <>
              <Moodlet {...selectedOption.moodletProps} />
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className={classes.placeholderText}>{placeholder}</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className={classes.dropdownMenu}>
          {options.map((opt) => {
            const isSelected = opt.id === selectedId;
            const isDisabled = opt.disabled;

            return (
              <div
                key={opt.id}
                onClick={
                  !isDisabled
                    ? () => {
                        onSelect(opt.id);
                        setIsOpen(false);
                      }
                    : undefined
                }
                className={[
                  classes.option,
                  isSelected && classes.optionSelected,
                  isDisabled ? classes.optionDisabled : classes.optionHover,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <Moodlet {...opt.moodletProps} />
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const classes = {
  container: "relative w-full",
  inputButton:
    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-white text-left text-violet-900",
  inputButtonWrapper: "flex items-center gap-2",
  inputDisabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  placeholderText: "text-violet-700",
  dropdownMenu:
    "absolute mt-1 z-10 w-full bg-white border border-violet-300 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-dropdown",
  option: "flex items-center gap-2 px-3 py-2.5 lg:px-1.5 lg:py-1.5 transition-colors rounded-2xl lg:rounded-xl text-violet-800",
  optionHover: "hover:bg-violet-100 cursor-pointer",
  optionSelected: "bg-violet-200 !text-black",
  optionDisabled: "text-gray-400 cursor-not-allowed opacity-40",
};
