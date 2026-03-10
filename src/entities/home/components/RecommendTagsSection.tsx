"use client";

import { useMemberProfile } from "@entities/profile/hooks";
import RecommendTagsCarousel from "./RecommendTagsCarousel";

export default function RecommendTagsSection() {
  const { data: profile } = useMemberProfile();
  const tagCount = profile?.preferredTags?.length ?? 0;

  return (
    <>
      {Array.from({ length: tagCount }, (_, i) => (
        <RecommendTagsCarousel key={i} index={i} />
      ))}
    </>
  );
}
