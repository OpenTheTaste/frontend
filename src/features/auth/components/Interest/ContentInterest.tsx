"use client";

import { useState, useEffect, useRef } from "react";
import { authApi, CategoryItem, TagItem } from "@entities/auth/api/auth";
import ListCategory from "@/features/auth/components/Interest/ListCategory";
import SelectedTag from "@/features/auth/components/Interest/SelectedTag";
import SelectTag from "@/features/auth/components/Interest/SelectTag";
import ButtonInterest from "@/features/auth/components/Interest/ButtonInterest";
import { ButtonSkip } from "./ButtonSkip";

export default function ContentInterest() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [tagsByCategory, setTagsByCategory] = useState<Record<number, TagItem[]>>({});
  const [selectedTagIdsByCategory, setSelectedTagIdsByCategory] = useState<Record<number, number[]>>({});
  const fetchedCategoryIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    authApi.getCategories().then((res) => {
      const cats = res.data;
      setCategories(cats);
      setSelectedCategory(cats[0] ?? null);
      setSelectedTagIdsByCategory(Object.fromEntries(cats.map((c) => [c.categoryId, []])));
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    if (fetchedCategoryIds.current.has(selectedCategory.categoryId)) return;

    fetchedCategoryIds.current.add(selectedCategory.categoryId);
    authApi.getTags(selectedCategory.categoryId).then((res) => {
      setTagsByCategory((prev) => ({
        ...prev,
        [selectedCategory.categoryId]: res.data,
      }));
    });
  }, [selectedCategory]);

  const currentTags = selectedCategory ? (tagsByCategory[selectedCategory.categoryId] ?? []) : [];
  const selectedTagIds = selectedCategory ? (selectedTagIdsByCategory[selectedCategory.categoryId] ?? []) : [];

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

  const handleSelectCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    setSelectedTagIdsByCategory(Object.fromEntries(categories.map((c) => [c.categoryId, []])));
  };

  // SelectedTag 표시용: Record<categoryName, tagName[]>
  const selectedTagsByCategory: Record<string, string[]> = Object.fromEntries(
    categories.map((cat) => [
      cat.name,
      (selectedTagIdsByCategory[cat.categoryId] ?? [])
        .map((tagId) => tagsByCategory[cat.categoryId]?.find((t) => t.tagId === tagId)?.name ?? "")
        .filter(Boolean),
    ])
  );

  const totalSelectedTags = Object.values(selectedTagIdsByCategory).flat().length;

  return (
    <section className="w-full bg-ot-background flex-1 flex items-center justify-center py-6">
      <div className="px-3 max-w-[1100px] mx-auto w-full flex flex-col">
        <h1 className="text-[2rem] font-bold text-ot-text mb-1">
          관심사를 선택해주세요
        </h1>

        <p className="text-[1rem] font-bold text-ot-gray-600 mb-4">
          좋아하는 카테고리와 장르를 선택하면 맞춤 콘텐츠를 추천해드립니다.
        </p>

        {/* 카테고리 & 태그 섹션 */}
        <div className="flex border border-text-ot-text rounded-lg overflow-hidden mb-2">
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
        <SelectedTag
          selectedTagsByCategory={selectedTagsByCategory}
          onClearAll={handleClearAll}
        />

        <div className="flex gap-3">
          <ButtonSkip />
          <ButtonInterest
            selectedTagCount={totalSelectedTags}
            disabled={totalSelectedTags === 0}
          />
        </div>
      </div>
    </section>
  );
}
