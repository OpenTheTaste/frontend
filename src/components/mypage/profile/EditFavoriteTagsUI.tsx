"use client";

import { useState } from "react";
import ListCategory from "@/components/onboarding/Interest/ListCategory";
import SelectTag from "@/components/onboarding/Interest/SelectTag";
import SelectedTag from "@/components/onboarding/Interest/SelectedTag";
import FinishEditButton from "@/components/mypage/profile/FinishEditButton";
import { Category } from "@/types/interest/category";
import { TAGS } from "@/types/interest/tags";

const CATEGORIES: Category[] = ["영화", "드라마", "예능", "다큐", "뉴스", "스포츠"];

const INITIAL_TAGS_BY_CATEGORY: Record<Category, string[]> = {
  영화: [],
  드라마: [],
  예능: [],
  다큐: [],
  뉴스: [],
  스포츠: [],
};

export default function EditFavoriteTags() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("영화");
  const [selectedTagsByCategory, setSelectedTagsByCategory] =
    useState<Record<Category, string[]>>(INITIAL_TAGS_BY_CATEGORY);

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

  // 아래 수정하기 버튼 기능 관련으로 사용하기
  const totalSelectedTags = Object.values(selectedTagsByCategory).flat().length;

  return (
    <section className="w-full bg-ot-background flex-1 flex flex-col items-center justify-center py-6">
      <div className="px-3 max-w-275 mx-auto w-full flex flex-col items-center">
        {/* 카테고리 & 테그 섹션 */}
        <div className="w-full flex border border-text-white rounded-lg overflow-hidden mb-2">
          <div className="border-r border-text-white">
            <ListCategory
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          <SelectTag tags={currentTags} selectedTags={selectedTags} onToggleTag={handleToggleTag} />
        </div>

        {/* 선택된 관심사 표시 */}
        <div className="w-full">
          <SelectedTag
            selectedTagsByCategory={selectedTagsByCategory}
            onClearAll={handleClearAll}
          />
        </div>

        <FinishEditButton selectedTags={selectedTagsByCategory} />
      </div>
    </section>
  );
}
