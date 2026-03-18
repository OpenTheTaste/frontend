"use client";

import Image from "next/image";
import { KeyboardEvent, useEffect, useState } from "react";
import { Input } from "@shared/components";

interface ProfileEditorProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function ProfileEditor({
  nickname,
  onNicknameChange,
}: ProfileEditorProps) {
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
    <div className="flex w-full flex-col items-center">
      {/* 프로필 아이콘 */}
      <div className="relative h-16 w-16 overflow-hidden rounded-full">
        <Image
          src="/icons/logo.svg"
          alt="Profile Logo"
          fill
          className="object-cover"
        />
      </div>

      {/* 이름 영역 */}
      <div className="mt-4 mb-3 flex h-10 w-full max-w-100 flex-col items-center">
        <Input
          value={draftName}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={commitNickname}
          onKeyDown={handleKeyDown}
          className={`text-ot-text h-full w-full text-center transition-all outline-none ${error ? "animate-shake border border-red-500" : "border-ot-gray-300 border"}`}
        />
      </div>
    </div>
  );
}
