"use client";

import { useState, useEffect, useRef } from "react";
import { useMemberProfile } from "@/entities/profile/hooks";
import ProfileEditor from "./ProfileEditor";
import EditFavoriteTagsUI from "./EditFavoriteTagsUI";

export default function ProfileEditContainer() {
  const { data: profile } = useMemberProfile();
  const [nickname, setNickname] = useState<string>("");
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (profile && !isInitializedRef.current) {
      setNickname(profile.nickname);
      isInitializedRef.current = true;
    }
  }, [profile]);

  const preferredTagIds = profile?.preferredTags.map((t) => t.tagId) ?? [];

  return (
    <>
      <ProfileEditor nickname={nickname} onNicknameChange={setNickname} />

      <EditFavoriteTagsUI nickname={nickname} initialTagIds={preferredTagIds} />
    </>
  );
}
