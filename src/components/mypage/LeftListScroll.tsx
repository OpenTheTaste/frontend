import Image from "next/image";

interface LeftListScrollProps {
  onClick: () => void;
}

export default function LeftListScroll({ onClick }: LeftListScrollProps) {
  return (
    <button
      type="button"
      aria-label="왼쪽으로 목록 스크롤"
      onClick={onClick}
      className="flex items-center justify-center pointer-events-auto z-100 w-13 h-25 rounded-2xl bg-[#1D1D1D]/50 backdrop-blur-md"
    >
      <Image
        src="/icons/LeftListScroll.svg"
        alt="LeftScroll"
        width={25}
        height={50}
        className="shrink-0"
      />
    </button>
  );
}
