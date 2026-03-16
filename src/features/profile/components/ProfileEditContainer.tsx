"use client";

import { useState } from "react";
import {
  EditFavoriteTagsUI,
  FinishEditButton,
  ProfileEditor,
} from "@features/profile/components";
import { MemberProfile } from "@/entities/profile/api";
import { useMemberProfile } from "@/entities/profile/hooks";

function ProfileEditContent({ profile }: { profile: MemberProfile }) {
  const initialTagIds = profile.preferredTags.map((t) => t.tagId);

  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(initialTagIds);

  const isNicknameChanged = nickname !== profile.nickname;
  const isTagsChanged =
    selectedTagIds.length !== initialTagIds.length ||
    selectedTagIds.some((id) => !initialTagIds.includes(id));

  const isChanged = isNicknameChanged || isTagsChanged;

  return (
    <>
      <ProfileEditor nickname={nickname} onNicknameChange={setNickname} />
      <EditFavoriteTagsUI
        initialTagIds={initialTagIds}
        onTagsChange={setSelectedTagIds}
      />
      <FinishEditButton
        nickname={nickname}
        selectedTagIds={selectedTagIds}
        disabled={!isChanged}
      />
    </>
  );
}

export default function ProfileEditContainer() {
  const { data: profile } = useMemberProfile();

  if (!profile) return null;

  return <ProfileEditContent profile={profile} />;
}
