interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="inline-flex items-center justify-center text-xs border rounded-[1.25rem] border-ot-text px-3 py-[0.063rem]">
      {text}
    </div>
  );
};

export default Badge;
