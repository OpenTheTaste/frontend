"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShortsPlayer } from "@/entities/shorts/components/ShortsPlayer";
import { ShortsInformation } from "@/entities/shorts/components/ShortsInformation";
import { ShortsActionButtons } from "@/entities/shorts/components/ShortsActionButtons";
import { ShortsData } from "@shared/types/player/shorts";
import { postLikes } from "@entities/likes/api";
import { toggleBookmark } from "@entities/bookmark/api/toggleBookmark";
import { getShortLists } from "@entities/shorts/api/getShortLists";
import { postShortsCta } from "@entities/shorts/api/postShortsCta";
import { useMediaLink } from "@shared/hooks/useMediaLink";
import { MediaType } from "@shared/types";

interface ShortsContainerProps {
  initialShortsId?: number;
}

export const ShortsContainer = ({ initialShortsId }: ShortsContainerProps) => {
  const router = useRouter();
  const { getMediaHref } = useMediaLink();
  const [shortsList, setShortsList] = useState<ShortsData[]>([]);
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [likedToggles, setLikedToggles] = useState<Set<number>>(new Set());
  const [bookmarkToggles, setBookmarkToggles] = useState<Set<number>>(new Set());

  useEffect(() => {
    getShortLists({ page: 0, size: 10 }).then(({ dataList }) => {
      const list = dataList.map((item) => ({
        id: item.shortFormId,
        src: item.shortMasterPlaylistUrl,
        isLiked: item.isLiked,
        isBookmarked: item.isBookmarked,
        originMediaId: item.originMediaId,
        mediaType: item.mediaType as MediaType,
        contentLink: {
          title: item.title,
          url: `/contents/${item.originMediaId}`,
          editor: item.editorName,
          date: item.uploadDate.slice(0, 10).replace(/-/g, ".") + ".",
        },
      }));

      setShortsList(list);

      if (initialShortsId) {
        const idx = list.findIndex((s) => s.id === initialShortsId);
        if (idx !== -1) setCurrentShortsIndex(idx);
      }
    });
  }, [initialShortsId]);

  const currentShorts = shortsList[currentShortsIndex];

  useEffect(() => {
    if (!currentShorts) return;
    window.history.replaceState(null, "", `/shorts/${currentShorts.id}`);
  }, [currentShorts]);

  if (!currentShorts) return null;

  const isLiked = currentShorts.isLiked !== likedToggles.has(currentShorts.id);
  const isBookmarked =
    currentShorts.isBookmarked !== bookmarkToggles.has(currentShorts.id);

  const handleNextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handlePrevShorts = () => {
    setCurrentShortsIndex((prev) =>
      prev === 0 ? shortsList.length - 1 : prev - 1
    );
  };

  const handleContentLinkClick = async () => {
    await postShortsCta(currentShorts.id);
    router.push(getMediaHref(currentShorts.originMediaId, currentShorts.mediaType));
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
            onPrevShorts={handlePrevShorts}
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
