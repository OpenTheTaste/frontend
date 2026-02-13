import Image from "next/image";

interface InteractionButtonProps {
  type: "like" | "bookmark";
  isActive: boolean;
  onAction: () => void;
  size?: "lg" | "md" | "sm";
}

const sizeConfig = {
  lg: {
    button: "w-18 h-14", // 72 * 56 px
    image: { width: 72, height: 56 },
  },
  md: {
    button: "w-14 h-11", // 56 * 44 px
    image: { width: 56, height: 44 },
  },
  sm: {
    button: "w-12 h-9", // 48 * 36 px
    image: { width: 48, height: 36 },
  },
};

export const InteractionButton = ({
  type,
  isActive,
  onAction,
  size = "lg",
}: InteractionButtonProps) => {
  const config = sizeConfig[size];

  return (
    // size : 72 * 56 px, radius : 36px
    <button
      onClick={onAction}
      className={`${config.button} ${config.image} flex items-center justify-center rounded-[2.25rem] shrink-0 cursor-pointer`}
    >
      <Image
        src={
          type === "like"
            ? isActive
              ? "/icons/LikeActive.svg"
              : "/icons/LikeDefault.svg"
            : isActive
              ? "/icons/BookmarkActive.svg"
              : "/icons/BookmarkDefault.svg"
        }
        alt={`${type} 아이콘`}
        width={config.image.width}
        height={config.image.height}
        className="object-contain"
      />
    </button>
  );
};
