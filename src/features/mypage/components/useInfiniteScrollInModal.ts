"use client";

import { useEffect, useRef } from "react";

interface UseInfiniteScrollInModalOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;  // useRef로 사용
  isOpen: boolean; // 추가
}

export const useInfiniteScrollInModal = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.1,
  scrollContainerRef,  // 모달의 스크롤 영역 인식 (scrollRef 인식 -> 모달 인식)
  isOpen,
}: UseInfiniteScrollInModalOptions) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    if (!scrollContainerRef.current) return;  // 모달 안켜졌으면 하지 말기

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold,
        root: scrollContainerRef.current,  // scrollRef 위치부터 하기
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold, scrollContainerRef, isOpen]);

  return { observerRef };
};