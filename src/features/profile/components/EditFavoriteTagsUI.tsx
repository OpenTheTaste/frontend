"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getTags, CategoryItem, TagItem } from "@entities/auth/api";
import { ListCategory, SelectTag, SelectedTag } from "@features/auth/components/Interest";
import { FinishEditButton } from "@features/profile/components";

interface EditFavoriteTagsUIProps {
  nickname: string;
  initialTagIds: number[];
}

export default function EditFavoriteTagsUI({ nickname, initialTagIds }: EditFavoriteTagsUIProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const hasInitializedRef = useRef(false);

  // 선택된 태그는 tagId 배열 하나만 관리
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  // 부모에서 내려준 초기 태그 세팅
  useEffect(() => {
    if (hasInitializedRef.current) return;
    if (initialTagIds.length === 0) return;

    setSelectedTagIds(initialTagIds);
    hasInitializedRef.current = true;
  }, [initialTagIds]);

  // 카테고리 조회
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // 첫 카테고리 자동 선택
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // 모든 카테고리 태그 조회
  const { data: tagsByCategory = {} } = useQuery({
    queryKey: ["allTags", categories.map((c) => c.categoryId)],
    queryFn: () =>
      Promise.all(
        categories.map((cat) =>
          getTags(cat.categoryId).then((tags) => ({
            categoryId: cat.categoryId,
            tags,
          })),
        ),
      ).then((results) =>
        Object.fromEntries(results.map(({ categoryId, tags }) => [categoryId, tags])),
      ),
    enabled: categories.length > 0,
    staleTime: Infinity,
  });

  const currentTags = selectedCategory
    ? ((tagsByCategory as Record<number, TagItem[]>)[selectedCategory.categoryId] ?? [])
    : [];

  const handleToggleTag = (tagId: number) => {
    setSelectedTagIds((prev) => {
      if (!prev.includes(tagId) && prev.length >= 5) {
        alert("태그는 최대 5개까지만 선택할 수 있습니다.");
        return prev;
      }
      return prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId];
    });
  };

  const handleClearAll = () => {
    setSelectedTagIds([]);
  };

  // 선택된 태그를 카테고리별로 UI에 표시
  const selectedTagsByCategory: Record<string, string[]> = useMemo(() => {
    return Object.fromEntries(
      categories.map((cat) => [
        cat.name,
        (tagsByCategory as Record<number, TagItem[]>)[cat.categoryId]
          ?.filter((tag) => selectedTagIds.includes(tag.tagId))
          .map((tag) => tag.name) ?? [],
      ]),
    );
  }, [categories, tagsByCategory, selectedTagIds]);

  return (
    <section className="w-full bg-ot-background flex-1 flex flex-col items-center justify-center py-6">
      <div className="px-3 max-w-275 mx-auto w-full flex flex-col items-center">
        {/* 카테고리 & 태그 선택 */}
        <div className="w-full flex border border-text-ot-text rounded-lg overflow-hidden mb-2">
          <div className="border-r border-text-ot-text">
            <ListCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
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

        {/* 저장 버튼 */}
        <FinishEditButton nickname={nickname} selectedTagIds={selectedTagIds} />
      </div>
    </section>
  );
}
