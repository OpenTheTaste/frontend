'use client';

import { Category } from "@/types/interest/category";
import { ChevronRight } from 'lucide-react';


interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export default function ListCategory({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryListProps) {
  return (
    <div className="w-[180px] bg-ot-background">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const buttonClassName = isSelected ? 'bg-ot-primary-50' : 'hover:bg-ot-gray-750';
        const textClassName = isSelected ? 'text-ot-primary-500' : 'text-ot-gray-300';
        const iconClassName = isSelected ? 'text-ot-primary-500' : 'text-ot-gray-500';

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full flex items-center justify-between px-6 py-4 text-left border-b border-ot-gray-700 last:border-b-0 transition-colors ${buttonClassName}`}
          >
            <span className={`text-[1rem] font-bold ${textClassName}`}>
              {category}
            </span>
            <ChevronRight size={20} className={iconClassName} />
          </button>
        );
      })}
    </div>
  );
}