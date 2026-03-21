"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShortsPlayer } from "@features/shorts/components";
import { postBookmarkApi } from "@entities/bookmark/api";
import { postLikesApi } from "@entities/likes/api";
import { postShortsCtaApi, postShortsEventsApi } from "@entities/shorts/api";
import {
  ShortsActionButtons,
  ShortsInformation,
  ShortsSkeleton,
} from "@entities/shorts/components";
import { useShortformList } from "@entities/shorts/hooks";
import { useMediaLink } from "@shared/hooks";

interface ShortsContainerProps {
  initialShortsId?: number;
}

export const ShortsContainer = ({ initialShortsId }: ShortsContainerProps) => {
  const router = useRouter();
  const { getMediaHref } = useMediaLink();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);
  const [likedToggles, setLikedToggles] = useState<Set<number>>(new Set());
  const [bookmarkToggles, setBookmarkToggles] = useState<Set<number>>(
    new Set(),
  );

  const {
    shortsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useShortformList();

  const currentShorts = shortsList[currentShortsIndex];

  useEffect(() => {
    if (!initialShortsId || !shortsList.length || initializedRef.current)
      return;
    const idx = shortsList.findIndex((s) => s.id === initialShortsId);
    if (idx === -1) return;
    initializedRef.current = true;
    setCurrentShortsIndex(idx);
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop =
          idx * scrollContainerRef.current.clientHeight;
      }
    });
  }, [initialShortsId, shortsList]);

  useEffect(() => {
    if (!currentShorts) return;
    window.history.replaceState(null, "", `/shorts/${currentShorts.id}`);
  }, [currentShorts]);

  useEffect(() => {
    if (!currentShorts) return;
    const timer = setTimeout(() => postShortsEventsApi(currentShorts.id), 5000);
    return () => clearTimeout(timer);
  }, [currentShorts]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const { scrollTop, clientHeight } = scrollContainerRef.current;
      const newIndex = Math.round(scrollTop / clientHeight);
      setCurrentShortsIndex(newIndex);

      if (
        hasNextPage &&
        !isFetchingNextPage &&
        newIndex >= shortsList.length - 3
      ) {
        fetchNextPage();
      }
    }, 150);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, shortsList.length]);

  const handleShortsEnded = useCallback(() => {
    const nextIndex = currentShortsIndex + 1;
    if (!scrollContainerRef.current || nextIndex >= shortsList.length) return;
    scrollContainerRef.current.scrollTo({
      top: nextIndex * scrollContainerRef.current.clientHeight,
      behavior: "smooth",
    });
  }, [currentShortsIndex, shortsList.length]);

  const toggleLiked = (id: number) =>
    setLikedToggles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleBookmarked = (id: number) =>
    setBookmarkToggles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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

  if (isLoading || (initialShortsId && !initializedRef.current)) {
    return <ShortsSkeleton />;
  }

  const isLiked =
    !!currentShorts &&
    currentShorts.isLiked !== likedToggles.has(currentShorts.id);
  const isBookmarked =
    !!currentShorts &&
    currentShorts.isBookmarked !== bookmarkToggles.has(currentShorts.id);

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
        {shortsList.map((shorts, index) => {
          const isNearby = Math.abs(index - currentShortsIndex) <= 1;
          return (
            <div
              key={index}
              className="relative flex h-full w-full shrink-0 bg-black"
              style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
            >
              {isNearby && (
                <ShortsPlayer
                  src={shorts.src}
                  shortsId={shorts.id}
                  isActive={index === currentShortsIndex}
                  onEnded={handleShortsEnded}
                />
              )}
            </div>
          );
        })}
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
