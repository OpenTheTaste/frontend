'use client';

import { useState } from 'react';
import { ShortsPlayer } from '@/components/player/ShortsPlayer';
import { ShortsInformation } from '@/components/player/ShortsInformation';
import { ShortsActionButtons } from '@/components/player/ShortsActionButtons';
import { ShortsContainerProps } from '@/types/shorts';

export const ShortsContainer = ({ initialData }: ShortsContainerProps) => {
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const currentShorts = initialData[currentShortsIndex] || initialData[0];

  const handleNextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % initialData.length);
  };

  const handleContentLinkClick = () => {
    window.location.href = currentShorts.contentLink.url;
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-8">
      <div className="flex items-end gap-4">
        <div className="max-w-sm mr-4">
          <ShortsInformation
            contentLink={currentShorts.contentLink}
            onContentLinkClick={handleContentLinkClick}
          />
        </div>

        <div className="h-[80vh] max-h-[720px] aspect-[9/16] bg-ot-gray-800 rounded-lg overflow-hidden">
          <ShortsPlayer
            src={currentShorts.src}
            shortsId={currentShorts.id}
            onNextShorts={handleNextShorts}
          />
        </div>

        <div className="ml-4">
          <ShortsActionButtons
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            onLikeClick={handleLikeClick}
            onBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
    </div>
  );
};