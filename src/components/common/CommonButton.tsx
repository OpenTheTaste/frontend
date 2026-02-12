"use client";

import { useState } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CommonButton({ children, className = "", ...props }: CommonButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  // 1) 기본 상태
  const defaultColor: React.CSSProperties = {
    background: "var(--gradient-ot-primary-diagonal)",
  };

  // 2) 클릭 상태
  const pressedColor: React.CSSProperties = {
    backgroundColor: "var(--color-ot-primary-700)",
    backgroundImage: "none",
  };

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`flex items-center justify-center gap-4 transition-all ${className}`}
      style={isPressed ? pressedColor : defaultColor}
      {...props}
    >
      {children}
    </button>
  );
}
