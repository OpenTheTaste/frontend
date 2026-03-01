"use client";

import { Input } from "@shared-ui";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchInputProps {
  keyword?: string;
}

export default function SearchInput({ keyword }: SearchInputProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(keyword ?? "-ui");

  const submitSearch = (value: string) => {
    if (value) {
      router.push(`?keyword=${encodeURIComponent(value)}`);
    } else {
      router.push(`?`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("-ui");
    router.push(`?`);
  };

  return (
    <div className="mx-auto flex w-full max-w-160 items-center gap-4">
      <div className="relative flex-1">
        <Input
          placeholder="콘텐츠를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ot-gray-500 hover:text-ot-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <button
        type="button"
        className="shrink-0 cursor-pointer"
        onClick={() => submitSearch(inputValue.trim())}
      >
        <Search size={32} className="text-ot-text hover:text-ot-gray-600" />
      </button>
    </div>
  );
}
