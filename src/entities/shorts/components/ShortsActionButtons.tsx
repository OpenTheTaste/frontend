"use client";

import { InteractionButton } from "@/shared/components";

interface ShortsActionButtonsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeClick: () => void;
  onBookmarkClick: () => void;
}

export const ShortsActionButtons = ({
  isLiked,
  isBookmarked,
  onLikeClick,
  onBookmarkClick,
}: ShortsActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <InteractionButton
        type="like"
        isActive={isLiked}
        size="xs"
        onAction={onLikeClick}
      />
      <InteractionButton
        type="bookmark"
        isActive={isBookmarked}
        size="xs"
        onAction={onBookmarkClick}
      />
    </div>
  );
};
