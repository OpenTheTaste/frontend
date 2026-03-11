"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@base-components";

interface SearchInputProps {
  keyword?: string;
}

export default function SearchInput({ keyword }: SearchInputProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(keyword ?? "");

  const submitSearch = (value: string) => {
    if (value.length < 2) {
      alert("검색어는 2글자 이상 입력해주세요.");
      return;
    }
    if (value) {
      router.push(`?keyword=${encodeURIComponent(value)}`);
    } else {
      router.push(`?`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      submitSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    router.push(`?`);
  };

  return (
    <div className="mx-auto flex w-full max-w-160 items-center gap-4">
      <div className="relative flex-1">
        <Input
          placeholder="콘텐츠(시리즈) 제목을 입력하세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="text-ot-gray-500 hover:text-ot-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
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
