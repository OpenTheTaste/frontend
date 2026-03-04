"use client";

import { useState, useEffect } from "react";
import { useMemberProfile } from "@/entities/profile/hooks";
import ProfileEditor from "./ProfileEditor";
import EditFavoriteTagsUI from "./EditFavoriteTagsUI";

export default function ProfileEditContainer() {
  const { data: profile } = useMemberProfile();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname);
    }
  }, [profile]);

  return (
    <>
      <ProfileEditor nickname={nickname} onNicknameChange={setNickname} />
      <EditFavoriteTagsUI nickname={nickname} />
    </>
  );
}
