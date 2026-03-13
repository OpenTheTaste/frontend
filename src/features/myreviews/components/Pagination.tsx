'use client'

import { Dispatch } from "react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number; // 현재 위치한 페이지 (0, 1, 2, ...)
  totalPage: number;   // 총 페이지 개수 (page의 size에 따라 달라짐)
  setPage: Dispatch<React.SetStateAction<number>>; // 현재 페이지가 어딘지 설정
}

export default function Pagination({ totalPage, currentPage, setPage }: PaginationProps) {
  
  return (
    <section className="mt-8">
      <div className="flex justify-center gap-x-4">
        {/* 이전 페이지 < 버튼 */}
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft size={20}/>
        </button>
        {/* 페이지 선택 버튼 (1, 2, 3, ...) */}
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className={`${currentPage === i ? "text-ot-gray-100" : "text-ot-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}
        {/* 이후 페이지 > 버튼 */}
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPage - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}