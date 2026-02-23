export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const CommonButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: CommonButtonProps) => {
  const baseStyle =
    "flex items-center justify-center gap-4 rounded-lg cursor-pointer";

  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-ot-primary-gradient-btn text-ot-text";
      break;

    case "secondary":
      variantStyle =
        "bg-ot-secondary-700 text-ot-text hover:bg-ot-secondary-800";
      break;

    case "outline":
      variantStyle =
        "border border-ot-primary-400 bg-none text-ot-primary-400 hover:bg-ot-primary-100";
      break;

    default:
      return;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
