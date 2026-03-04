"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getTags, setPreferredTags, CategoryItem, TagItem } from "@entities/auth/api";
import { ListCategory, SelectTag, SelectedTag } from "@features/auth/components/Interest";
import { FinishEditButton } from "@features/profile/components";
import { useMemberProfile } from "@/entities/profile/hooks";

interface EditFavoriteTagsUIProps {
  nickname: string;
}

export default function EditFavoriteTagsUI({ nickname }: EditFavoriteTagsUIProps) {
  const { data: profile } = useMemberProfile();
  const initializedFromProfileRef = useRef(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [selectedTagIdsByCategory, setSelectedTagIdsByCategory] = useState<
    Record<number, number[]>
  >({});

  // 카테고리 목록 조회 + 캐싱
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories().then((res) => res.data),
  });

  // 첫 카테고리 자동 선택
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
      setSelectedTagIdsByCategory(Object.fromEntries(categories.map((c) => [c.categoryId, []])));
    }
  }, [categories, selectedCategory]);

  // 모든 카테고리 태그 조회 + 캐싱
  const { data: tagsByCategory = {} } = useQuery({
    queryKey: ["allTags", categories.map((c) => c.categoryId)],
    queryFn: () =>
      Promise.all(
        categories.map((cat) =>
          getTags(cat.categoryId).then((res) => ({
            categoryId: cat.categoryId,
            tags: res.data,
          })),
        ),
      ).then((results) =>
        Object.fromEntries(results.map(({ categoryId, tags }) => [categoryId, tags])),
      ),
    enabled: categories.length > 0,
    staleTime: Infinity,
  });

  // 태그 로드 후 기존 선호태그 초기값 세팅
  useEffect(() => {
    if (initializedFromProfileRef.current) return;
    if (!profile || Object.keys(tagsByCategory).length === 0) return;

    const preferredTagIds = profile.preferredTags.map((t) => t.tagId);
    const initialSelected: Record<number, number[]> = {};

    Object.entries(tagsByCategory).forEach(([categoryId, tags]) => {
      const matched = (tags as TagItem[])
        .filter((tag) => preferredTagIds.includes(tag.tagId))
        .map((tag) => tag.tagId);
      if (matched.length > 0) {
        initialSelected[Number(categoryId)] = matched;
      }
    });

    setSelectedTagIdsByCategory((prev) => ({
      ...prev,
      ...initialSelected,
    }));
    initializedFromProfileRef.current = true;
  }, [tagsByCategory, profile]);

  const currentTags = selectedCategory
    ? ((tagsByCategory as Record<number, TagItem[]>)[selectedCategory.categoryId] ?? [])
    : [];

  const selectedTagIds = selectedCategory
    ? (selectedTagIdsByCategory[selectedCategory.categoryId] ?? [])
    : [];

  const handleToggleTag = (tagId: number) => {
    if (!selectedCategory) return;
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

  const handleSelectCategory = (category: CategoryItem) => setSelectedCategory(category);

  const handleClearAll = () => {
    setSelectedTagIdsByCategory(Object.fromEntries(categories.map((c) => [c.categoryId, []])));
  };

  const selectedTagsByCategory: Record<string, string[]> = Object.fromEntries(
    categories.map((cat) => [
      cat.name,
      (selectedTagIdsByCategory[cat.categoryId] ?? [])
        .map(
          (tagId) =>
            (tagsByCategory as Record<number, TagItem[]>)[cat.categoryId]?.find(
              (t) => t.tagId === tagId,
            )?.name ?? "",
        )
        .filter(Boolean),
    ]),
  );

  return (
    <section className="w-full bg-ot-background flex-1 flex flex-col items-center justify-center py-6">
      <div className="px-3 max-w-275 mx-auto w-full flex flex-col items-center">
        {/* 카테고리 & 테그 섹션 */}
        <div className="w-full flex border border-text-ot-text rounded-lg overflow-hidden mb-2">
          <div className="border-r border-text-ot-text">
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
        <div className="w-full">
          <SelectedTag
            selectedTagsByCategory={selectedTagsByCategory}
            onClearAll={handleClearAll}
          />
        </div>

        <FinishEditButton
          nickname={nickname}
          selectedTagIds={Object.values(selectedTagIdsByCategory).flat()}
        />
      </div>
    </section>
  );
}
