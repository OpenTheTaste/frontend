"use client";

import { MyReviewList } from "@features/myreviews/components";

export default function MyReviewBox() {
  return (
    <div className="border-ot-text w-full flex flex-col rounded-lg border px-10 py-10">
      <MyReviewList />
    </div>
  );
}