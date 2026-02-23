// src/components/Interest/InterestContent.tsx
"use client";

import { useState } from "react";
import { Category } from "@/types/interest/category";
import { TAGS } from "@/types/interest/tags";
import ListCategory from "@/components/onboarding/Interest/ListCategory";
import SelectedTag from "@/components/onboarding/Interest/SelectedTag";
import SelectTag from "@/components/onboarding/Interest/SelectTag";
import ButtonInterest from "@/components/onboarding/Interest/ButtonInterest";

const CATEGORIES: Category[] = [
  "영화",
  "드라마",
  "예능",
  "다큐",
  "뉴스",
  "스포츠",
];

const INITIAL_TAGS_BY_CATEGORY: Record<Category, string[]> = {
  영화: [],
  드라마: [],
  예능: [],
  다큐: [],
  뉴스: [],
  스포츠: [],
};

export default function ContentInterest() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("영화");
  const [selectedTagsByCategory, setSelectedTagsByCategory] = useState<
    Record<Category, string[]>
  >(INITIAL_TAGS_BY_CATEGORY);

  const currentTags = TAGS[selectedCategory];
  const selectedTags = selectedTagsByCategory[selectedCategory];

  const handleToggleTag = (tag: string) => {
    setSelectedTagsByCategory((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].includes(tag)
        ? prev[selectedCategory].filter((t) => t !== tag)
        : [...prev[selectedCategory], tag],
    }));
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleClearAll = () => {
    setSelectedTagsByCategory(INITIAL_TAGS_BY_CATEGORY);
  };

  const totalSelectedTags = Object.values(selectedTagsByCategory).flat().length;

  return (
    <section className="w-full bg-ot-background flex-1 flex items-center justify-center py-6">
      <div className="px-3 max-w-[1100px] mx-auto w-full flex flex-col">
        <h1 className="text-[2rem] font-bold text-white mb-1">
          관심사를 선택해주세요
        </h1>

        <p className="text-[1rem] font-bold text-ot-gray-600 mb-4">
          좋아하는 카테고리와 장르를 선택하면 맞춤 콘텐츠를 추천해드립니다.
        </p>

        {/* 카테고리 & 테그 섹션 */}
        <div className="flex border border-text-white rounded-lg overflow-hidden mb-2">
          <div className="border-r border-text-white">
            <ListCategory
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          <SelectTag
            tags={currentTags}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
          />
        </div>

        {/* 선택된 관심사 표시  */}
        <SelectedTag
          selectedTagsByCategory={selectedTagsByCategory}
          onClearAll={handleClearAll}
        />

        {/* 하단 버튼 */}
        <ButtonInterest
          selectedTagCount={totalSelectedTags}
          disabled={totalSelectedTags === 0}
        />
        <SelectTag
          tags={currentTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
      </div>

      {/* 선택된 관심사 표시 */}
      <SelectedTag
        selectedTagsByCategory={selectedTagsByCategory}
        onClearAll={handleClearAll}
      />

      {/* 하단 버튼 */}
      <ButtonInterest
        selectedTagCount={totalSelectedTags}
        disabled={totalSelectedTags === 0}
      />
    </section>
  );
}
