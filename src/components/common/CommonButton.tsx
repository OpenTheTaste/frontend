interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CommonButton({
  children,
  className = "",
  ...props
}: CommonButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-4 rounded-lg bg-ot-primary-gradient-btn cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
