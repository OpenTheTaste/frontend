'use client';

import Image from 'next/image';

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
      <button 
        onClick={onLikeClick}
        className="cursor-pointer hover:opacity-80 transition"
      >
        <Image
          src={isLiked ? "/icons/LikeActive.svg" : "/icons/LikeDefault.svg"}
          alt="좋아요"
          width={40}
          height={40}
        />
      </button>
      <button 
        onClick={onBookmarkClick}
        className="cursor-pointer hover:opacity-80 transition"
      >
        <Image
          src={isBookmarked ? "/icons/BookmarkActive.svg" : "/icons/BookmarkDefault.svg"}
          alt="북마크"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
};
