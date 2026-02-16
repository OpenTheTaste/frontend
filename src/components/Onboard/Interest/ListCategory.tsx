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
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`w-full flex items-center justify-between px-6 py-4 text-left border-b border-ot-gray-700 last:border-b-0 transition-colors ${
            selectedCategory === category
              ? 'bg-ot-primary-50'
              : 'hover:bg-ot-gray-750'
          }`}
        >
          <span className={`text-[1rem] font-bold ${
            selectedCategory === category ? 'text-ot-primary-500' : 'text-ot-gray-300'
          }`}>
            {category}
          </span>
          <ChevronRight
            size={20}
            className={selectedCategory === category ? 'text-ot-primary-500' : 'text-ot-gray-500'}
          />

        </button>
      ))}
    </div>
  );
}