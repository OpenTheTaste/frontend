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
  const [editName, setEditName] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // nickname props 바뀌면 동기화 (초기 로드 시)
  useEffect(() => {
    setDraftName(nickname ?? "");
  }, [nickname]);

  const handleSave = () => {
    if (draftName === undefined || !draftName.trim()) {
      setError("이름은 비워둘 수 없습니다.");
      return;
    }
    onNicknameChange(draftName.trim());
    setEditName(false);
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSave();
    if (e.key === "Escape") {
      setDraftName(nickname);
      setEditName(false);
      setError(null);
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
        {editName ? (
          <>
            <Input
              autoFocus
              value={draftName}
              onChange={(e) => {
                setDraftName(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className={`w-full h-full text-ot-text text-center outline-none transition-all
          ${error ? "border border-red-500 animate-shake" : "border border-ot-gray-300"}
        `}
            />

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </>
        ) : (
          <div
            onClick={() => setEditName(true)}
            className="w-full h-full flex items-center justify-center border border-transparent cursor-pointer"
          >
            <p
              onClick={() => setEditName(true)}
              className="text-xl font-semibold cursor-pointer hover:text-ot-gray-600 transition-colors"
            >
              {nickname}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
