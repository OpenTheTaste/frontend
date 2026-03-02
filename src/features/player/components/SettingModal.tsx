"use client";

import { useRef } from "react";

interface SettingOption {
  label: string;
  value: string | number;
  isActive: boolean;
}

interface SettingModalProps {
  title: string;
  isOpen: boolean;
  options: SettingOption[];
  onClose: () => void;
  onSelect: (value: string | number) => void;
}

export const SettingModal = ({
  title,
  isOpen,
  options,
  onClose,
  onSelect,
}: SettingModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-ot-gray-800 rounded-lg p-5"
    >
      <div className="flex gap-x-10">
        <p className="text-ot-text text-md font-semibold whitespace-nowrap">
          {title}
        </p>

        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className={`text-sm text-right transition-colors cursor-pointer ${
                option.isActive
                  ? "text-ot-text font-bold"
                  : "text-ot-gray-600 hover:text-ot-text"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
