"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ListCategory,
  SelectTag,
  SelectedTag,
} from "@features/auth/components/Interest";
import {
  CategoryItem,
  TagItem,
  getCategoriesApi,
  getTagsApi,
} from "@entities/auth/api";

interface EditFavoriteTagsUIProps {
  initialTagIds: number[];
  onTagsChange: (tagIds: number[]) => void;
}

export default function EditFavoriteTagsUI({
  initialTagIds,
  onTagsChange,
}: EditFavoriteTagsUIProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const hasInitializedRef = useRef(false);

  // 선택된 태그는 tagId 배열 하나만 관리
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(initialTagIds);

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
    queryFn: () => getCategoriesApi(),
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
          getTagsApi(cat.categoryId).then((tags) => ({
            categoryId: cat.categoryId,
            tags,
          })),
        ),
      ).then((results) =>
        Object.fromEntries(
          results.map(({ categoryId, tags }) => [categoryId, tags]),
        ),
      ),
    enabled: categories.length > 0,
    staleTime: Infinity,
  });

  const currentTags = selectedCategory
    ? ((tagsByCategory as Record<number, TagItem[]>)[
        selectedCategory.categoryId
      ] ?? [])
    : [];

  const handleToggleTag = (tagId: number) => {
    setSelectedTagIds((prev) => {
      if (!prev.includes(tagId) && prev.length >= 5) {
        alert("태그는 최대 5개까지만 선택할 수 있습니다.");
        return prev;
      }
      return prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
    });
  };

  const handleClearAll = () => {
    setSelectedTagIds([]);
  };

  useEffect(() => {
    onTagsChange(selectedTagIds);
  }, [selectedTagIds]);

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
    <section className="bg-ot-background flex w-full flex-1 flex-col items-center justify-center py-6">
      <div className="mx-auto flex w-full max-w-275 flex-col items-center px-3">
        {/* 카테고리 & 태그 선택 */}
        <div className="border-text-ot-text mb-2 flex w-full overflow-hidden rounded-lg border">
          <div className="border-text-ot-text border-r">
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
      </div>
    </section>
  );
}
