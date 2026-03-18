"use client";

import { useEffect, useState } from "react";
import { RecommendTagsCarousel } from "@entities/home/components";
import { useMemberProfile } from "@entities/profile/hooks";

export default function RecommendTagsSection() {
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useMemberProfile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tagCount = profile?.preferredTags?.length ?? 0;

  return (
    <>
      {Array.from({ length: tagCount }, (_, i) => (
        <RecommendTagsCarousel key={i} index={i} />
      ))}
    </>
  );
}
