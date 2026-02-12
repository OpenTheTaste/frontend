import Image from "next/image";

interface InteractionButtonProps {
  type: "like" | "bookmark";
  isActive: boolean;
  onAction: () => void;
}

export const InteractionButton = ({ type, isActive, onAction }: InteractionButtonProps) => {
  return (
    // size : 72 * 56 px, radius : 36px
    <button
      onClick={onAction}
      className="flex items-center justify-center w-18 h-14 rounded-[2.25rem] shrink-0"
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
        width={72}
        height={56}
        className="object-contain"
      />
    </button>
  );
};
