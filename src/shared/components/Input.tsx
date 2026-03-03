import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full h-full px-4 py-4
          bg-ot-gray-800 border border-ot-gray-700 rounded-lg focus:outline-none
          placeholder:text-ot-gray-600 text-[18px]  text-ot-text
          ${className}
        `}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
