"use client";

import { useEffect, useState } from "react";
import { RecommendTagsCarousel } from "@entities/home/components";
import { useMemberProfile } from "@entities/profile/hooks";

const MAX_TOP_TAGS = 3;

export default function RecommendTagsSection() {
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useMemberProfile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tagCount = Math.min(profile?.preferredTags?.length ?? 0, MAX_TOP_TAGS);

  return (
    <>
      {Array.from({ length: tagCount }, (_, i) => (
        <RecommendTagsCarousel key={i} index={i} />
      ))}
    </>
  );
}
