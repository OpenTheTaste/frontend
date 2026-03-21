"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShortsPlayer } from "@features/shorts/components";
import { postBookmarkApi } from "@entities/bookmark/api";
import { postLikesApi } from "@entities/likes/api";
import {
  getShortListsApi,
  postShortsCtaApi,
  postShortsEventsApi,
} from "@entities/shorts/api";
import {
  ShortsActionButtons,
  ShortsInformation,
  ShortsSkeleton,
} from "@entities/shorts/components";
import { useMediaLink } from "@shared/hooks";
import { MediaType, ShortsData } from "@shared/types";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getShortListsApi({ page: 0, size: 10 }).then(({ dataList }) => {
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
        if (idx !== -1) {
          setCurrentShortsIndex(idx);
          // 초기 스크롤 위치 설정
          requestAnimationFrame(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop =
                idx * scrollContainerRef.current.clientHeight;
            }
          });
        }
      }
    });
  }, [initialShortsId]);

  // 스크롤 위치로 현재 인덱스 감지
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const { scrollTop, clientHeight } = scrollContainerRef.current;
      const newIndex = Math.round(scrollTop / clientHeight);
      setCurrentShortsIndex(newIndex);
    }, 150);
  };

  const currentShorts = shortsList[currentShortsIndex];

  useEffect(() => {
    if (!currentShorts) return;
    window.history.replaceState(null, "", `/shorts/${currentShorts.id}`);
  }, [currentShorts]);

  useEffect(() => {
    if (!currentShorts) return;
    const timer = setTimeout(() => {
      postShortsEventsApi(currentShorts.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentShorts]);

  if (!shortsList.length) return <ShortsSkeleton />;

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
    if (!currentShorts) return;
    toggleLiked(currentShorts.id);
    try {
      await postLikesApi(currentShorts.id);
    } catch {
      toggleLiked(currentShorts.id);
    }
  };

  const handleBookmarkClick = async () => {
    if (!currentShorts) return;
    toggleBookmarked(currentShorts.id);
    try {
      await postBookmarkApi({ mediaId: currentShorts.id });
    } catch {
      toggleBookmarked(currentShorts.id);
    }
  };

  const handleContentLinkClick = () => {
    if (!currentShorts) return;
    postShortsCtaApi(currentShorts.id);
    router.push(
      getMediaHref(currentShorts.originMediaId, currentShorts.mediaType),
    );
  };

  const isLiked = currentShorts
    ? currentShorts.isLiked !== likedToggles.has(currentShorts.id)
    : false;
  const isBookmarked = currentShorts
    ? currentShorts.isBookmarked !== bookmarkToggles.has(currentShorts.id)
    : false;

  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-end justify-items-center px-8">
      <div className="mr-4 max-w-sm justify-self-end">
        {currentShorts && (
          <ShortsInformation
            contentLink={currentShorts.contentLink}
            onContentLinkClick={handleContentLinkClick}
          />
        )}
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="aspect-9/16 h-[80vh] max-h-180 overflow-y-scroll rounded-lg"
        style={{
          scrollSnapType: "y mandatory",
          scrollSnapStop: "always",
          overscrollBehavior: "contain",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {shortsList.map((shorts, index) => (
          <ShortsPlayer
            key={shorts.id}
            src={shorts.src}
            shortsId={shorts.id}
            isActive={index === currentShortsIndex}
          />
        ))}
      </div>

      <div className="ml-4 justify-self-start">
        {currentShorts && (
          <ShortsActionButtons
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            onLikeClick={handleLikeClick}
            onBookmarkClick={handleBookmarkClick}
          />
        )}
      </div>
    </div>
  );
};
