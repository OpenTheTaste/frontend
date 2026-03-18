"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ButtonInterest,
  ButtonSkip,
  ListCategory,
  SelectTag,
  SelectedTag,
} from "@features/auth/components";
import {
  CategoryItem,
  TagItem,
  getCategoriesApi,
  getTagsApi,
  postPreferredTagsApi,
  postSkipTagApi,
} from "@entities/auth/api";
import { InterestSkeleton } from "@entities/auth/components";

export default function ContentInterest() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [tagsByCategory, setTagsByCategory] = useState<
    Record<number, TagItem[]>
  >({});
  const [selectedTagIdsByCategory, setSelectedTagIdsByCategory] = useState<
    Record<number, number[]>
  >({});
  const fetchedCategoryIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    getCategoriesApi().then((cats) => {
      setCategories(cats);
      setSelectedCategory(cats[0] ?? null);
      setSelectedTagIdsByCategory(
        Object.fromEntries(cats.map((c) => [c.categoryId, []])),
      );
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    if (fetchedCategoryIds.current.has(selectedCategory.categoryId)) return;

    fetchedCategoryIds.current.add(selectedCategory.categoryId);
    getTagsApi(selectedCategory.categoryId).then((tags) => {
      setTagsByCategory((prev) => ({
        ...prev,
        [selectedCategory.categoryId]: tags,
      }));
    });
  }, [selectedCategory]);

  const currentTags = selectedCategory
    ? (tagsByCategory[selectedCategory.categoryId] ?? [])
    : [];
  const selectedTagIds = selectedCategory
    ? (selectedTagIdsByCategory[selectedCategory.categoryId] ?? [])
    : [];

  const handleToggleTag = (tagId: number) => {
    if (!selectedCategory) return;
    const isSelected = (
      selectedTagIdsByCategory[selectedCategory.categoryId] ?? []
    ).includes(tagId);
    if (!isSelected && totalSelectedTags >= 5) {
      alert("태그는 최대 5개까지만 선택할 수 있습니다.");
      return;
    }
    setSelectedTagIdsByCategory((prev) => {
      const current = prev[selectedCategory.categoryId] ?? [];
      return {
        ...prev,
        [selectedCategory.categoryId]: current.includes(tagId)
          ? current.filter((id) => id !== tagId)
          : [...current, tagId],
      };
    });
  };

  const handleSelectCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    setSelectedTagIdsByCategory(
      Object.fromEntries(categories.map((c) => [c.categoryId, []])),
    );
  };

  // SelectedTag 표시용: Record<categoryName, tagName[]>
  const selectedTagsByCategory: Record<string, string[]> = Object.fromEntries(
    categories.map((cat) => [
      cat.name,
      (selectedTagIdsByCategory[cat.categoryId] ?? [])
        .map(
          (tagId) =>
            tagsByCategory[cat.categoryId]?.find((t) => t.tagId === tagId)
              ?.name ?? "",
        )
        .filter(Boolean),
    ]),
  );

  const totalSelectedTags = Object.values(selectedTagIdsByCategory).flat()
    .length;

  const handleSubmit = async () => {
    const allTagIds = Object.values(selectedTagIdsByCategory).flat();
    try {
      await postPreferredTagsApi(allTagIds);
      router.push("/");
    } catch (err) {
      console.error("[관심사 제출] 실패:", err);
    }
  };

  const handleSkip = async () => {
    try {
      await postSkipTagApi();
      router.push("/");
    } catch (err) {
      console.error("건너뛰기 실패", err);
    }
  };

  if (categories.length === 0) return <InterestSkeleton />;

  return (
    <section className="bg-ot-background flex w-full flex-1 items-center justify-center py-6">
      <div className="mx-auto flex w-full max-w-275 flex-col px-3">
        <h1 className="text-ot-text mb-1 text-[2rem] font-bold">
          관심사를 선택해주세요
        </h1>

        <p className="text-ot-gray-600 mb-4 text-[1rem] font-bold">
          좋아하는 카테고리와 장르를 선택하면 맞춤 콘텐츠를 추천해드립니다.
        </p>

        {/* 카테고리 & 태그 섹션 */}
        <div className="border-text-ot-text mb-2 flex overflow-hidden rounded-lg border">
          <div className="border-text-ot-text border-r">
            <ListCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          <SelectTag
            tags={currentTags}
            selectedTagIds={selectedTagIds}
            onToggleTag={handleToggleTag}
          />
        </div>

        {/* 선택된 관심사 표시 */}
        <SelectedTag
          selectedTagsByCategory={selectedTagsByCategory}
          onClearAll={handleClearAll}
        />

        <div className="flex gap-3">
          <ButtonSkip onSkip={handleSkip} />
          <ButtonInterest
            selectedTagCount={totalSelectedTags}
            disabled={totalSelectedTags === 0}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
