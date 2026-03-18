"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShortsPlayer } from "@features/shorts/components";
import { postBookmarkApi } from "@entities/bookmark/api";
import { postLikesApi } from "@entities/likes/api";
import {
  getShortLists,
  postShortsCta,
  postShortsEvents,
} from "@entities/shorts/api";
import {
  ShortsActionButtons,
  ShortsInformation,
  ShortsSkeleton,
} from "@entities/shorts/components";
import { useMediaLink } from "@shared/hooks";
import { MediaType } from "@shared/types";
import { ShortsData } from "@shared/types/player";

interface ShortsContainerProps {
  initialShortsId?: number;
}

export const ShortsContainer = ({ initialShortsId }: ShortsContainerProps) => {
  const router = useRouter();
  const { getMediaHref } = useMediaLink();
  const [shortsList, setShortsList] = useState<ShortsData[]>([]);
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [likedToggles, setLikedToggles] = useState<Set<number>>(new Set());
  const [bookmarkToggles, setBookmarkToggles] = useState<Set<number>>(
    new Set(),
  );

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

  useEffect(() => {
    if (!currentShorts) return;
    const timer = setTimeout(() => {
      postShortsEvents(currentShorts.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentShorts]);

  if (!currentShorts) return <ShortsSkeleton />;

  const isLiked = currentShorts.isLiked !== likedToggles.has(currentShorts.id);
  const isBookmarked =
    currentShorts.isBookmarked !== bookmarkToggles.has(currentShorts.id);

  const handleNextShorts = () => {
    setCurrentShortsIndex((prev) => (prev + 1) % shortsList.length);
  };

  const handlePrevShorts = () => {
    setCurrentShortsIndex((prev) =>
      prev === 0 ? shortsList.length - 1 : prev - 1,
    );
  };

  const handleContentLinkClick = () => {
    postShortsCta(currentShorts.id);
    router.push(
      getMediaHref(currentShorts.originMediaId, currentShorts.mediaType),
    );
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
      await postLikesApi(currentShorts.id);
    } catch {
      toggleLiked(currentShorts.id);
    }
  };

  const handleBookmarkClick = async () => {
    toggleBookmarked(currentShorts.id);
    try {
      await postBookmarkApi({ mediaId: currentShorts.id });
    } catch {
      toggleBookmarked(currentShorts.id);
    }
  };

  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-end justify-items-center px-8">
      <div className="mr-4 max-w-sm justify-self-end">
        <ShortsInformation
          contentLink={currentShorts.contentLink}
          onContentLinkClick={handleContentLinkClick}
        />
      </div>

      <div className="bg-ot-gray-800 aspect-9/16 h-[80vh] max-h-180 overflow-hidden rounded-lg">
        <ShortsPlayer
          src={currentShorts.src}
          shortsId={currentShorts.id}
          onNextShorts={handleNextShorts}
          onPrevShorts={handlePrevShorts}
        />
      </div>

      <div className="ml-4 justify-self-start">
        <ShortsActionButtons
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          onLikeClick={handleLikeClick}
          onBookmarkClick={handleBookmarkClick}
        />
      </div>
    </div>
  );
};
