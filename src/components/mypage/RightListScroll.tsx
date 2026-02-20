import Image from "next/image";

interface RightListScrollProps {
  onClick: () => void;
}

export default function RightListScroll({ onClick }: RightListScrollProps) {
  return (
    <button
      type="button"
      aria-label="오른쪽으로 목록 스크롤"
      onClick={onClick}
      className="flex items-center justify-center pointer-events-auto z-100 w-13 h-25 rounded-2xl bg-[#1D1D1D]/50 backdrop-blur-md"
    >
      <Image
        src="/icons/RightListScroll.svg"
        alt="ListScroll"
        width={25}
        height={50}
        className="shrink-0"
      />
    </button>
  );
}
