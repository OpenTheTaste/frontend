"use client";

import { useEffect, useState } from "react";
import { ShortsPlayer } from "@/entities/shorts/components/ShortsPlayer";
import { ShortsInformation } from "@/entities/shorts/components/ShortsInformation";
import { ShortsActionButtons } from "@/entities/shorts/components/ShortsActionButtons";
import { ShortsData } from "@shared/types/player/shorts";
import { postLikes } from "@entities/likes/api";
import { toggleBookmark } from "@entities/bookmark/api/toggleBookmark";
import { getShortLists } from "@entities/shorts/api/getShortLists";

export const ShortsContainer = () => {
  const [shortsList, setShortsList] = useState<ShortsData[]>([]);
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [likedToggles, setLikedToggles] = useState<Set<number>>(new Set());
  const [bookmarkToggles, setBookmarkToggles] = useState<Set<number>>(new Set());

  useEffect(() => {
    getShortLists({ page: 0, size: 10 }).then(({ dataList }) => {
      setShortsList(
        dataList.map((item) => ({
          id: item.shortFormId,
          src: item.shortMasterPlaylistUrl,
          isLiked: item.isLiked,
          isBookmarked: item.isBookmarked,
          contentLink: {
            title: item.title,
            url: `/contents/${item.originMediaId}`,
            editor: item.editorName,
            date: item.uploadDate.slice(0, 10).replace(/-/g, ".") + ".",
          },
        }))
      );
    });
  }, []);

  if (shortsList.length === 0) return null;

  const currentShorts = shortsList[currentShortsIndex] || shortsList[0];

  const isLiked = currentShorts.isLiked !== likedToggles.has(currentShorts.id);
  const isBookmarked =
    currentShorts.isBookmarked !== bookmarkToggles.has(currentShorts.id);

  const handleNextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handleContentLinkClick = () => {
    window.location.href = currentShorts.contentLink.url;
  };

  const toggleLiked = (id: number) =>
    setLikedToggles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleBookmarked = (id: number) =>
    setBookmarkToggles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleLikeClick = async () => {
    toggleLiked(currentShorts.id);
    try {
      await postLikes(currentShorts.id);
    } catch {
      toggleLiked(currentShorts.id);
    }
  };

  const handleBookmarkClick = async () => {
    toggleBookmarked(currentShorts.id);
    try {
      await toggleBookmark({ mediaId: currentShorts.id });
    } catch {
      toggleBookmarked(currentShorts.id);
    }
  };

  return (
    <div className="flex items-center justify-center px-8">
      <div className="flex items-end gap-4">
        <div className="max-w-sm mr-4">
          <ShortsInformation
            contentLink={currentShorts.contentLink}
            onContentLinkClick={handleContentLinkClick}
          />
        </div>

        <div className="h-[80vh] max-h-[720px] aspect-9/16 bg-ot-gray-800 rounded-lg overflow-hidden">
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
