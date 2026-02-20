'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import { ShortsPlayer } from '@/components/player/ShortsPlayer';
import { ShortsInformation } from '@/components/player/ShortsInformation';
import { ShortsActionButtons } from '@/components/player/ShortsActionButtons';

export default function ShortsPage() {
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 임시 데이터 - 나중에 API로 교체
  const shortsList = [
    {
      id: '1',
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      contentLink: {
        title: '다만 악에서 구하소서 (원본)',
        url: '/contents/1',
        editor: '에디터',
        date: '2026.02.07.',
      },
    },
    // 추가 쇼츠 데이터...
  ];

  const currentShorts = shortsList[currentShortsIndex] || shortsList[0];

  const handleNextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % shortsList.length);
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
    <div className="min-h-screen bg-ot-background flex flex-col overflow-hidden">
      <Header />
      
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
    </div>
  );
}
