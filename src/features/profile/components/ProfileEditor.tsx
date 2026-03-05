"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { Input } from "@base-components";

interface ProfileEditorProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function ProfileEditor({ nickname, onNicknameChange }: ProfileEditorProps) {
  const [draftName, setDraftName] = useState<string>(nickname ?? "");
  const [error, setError] = useState<string | null>(null);

  // nickname props 바뀌면 동기화 (초기 로드 시)
  useEffect(() => {
    setDraftName(nickname ?? "");
  }, [nickname]);

  const handleChange = (value: string) => {
    setDraftName(value);
    if (error) setError(null);
    if (!value.trim()) {
      setError("이름은 비워둘 수 없습니다.");
      // return;
    }
    // onNicknameChange(value.trim());
  };

  const commitNickname = () => {
    const trimmed = draftName.trim();
    if (!trimmed) {
      setError("이름은 비워둘 수 없습니다.");
      return;
    }
    onNicknameChange(trimmed);
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      commitNickname();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      setDraftName(nickname);
      setError(null);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 프로필 아이콘 */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image src="/icons/logo.svg" alt="Profile Logo" fill className="object-cover" />
      </div>

      {/* 이름 영역 */}
      <div className="w-full max-w-100 h-10 mt-4 mb-3 flex flex-col items-center">
        <Input
          value={draftName}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={commitNickname}
          onKeyDown={handleKeyDown}
          className={`w-full h-full text-ot-text text-center outline-none transition-all
            ${error ? "border border-red-500 animate-shake" : "border border-ot-gray-300"}`}
        />
      </div>
    </div>
  );
}
