'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-600 rounded-lg p-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-white"
      >
        <span>{question}</span>
        <ChevronDown 
          size={60}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <p className="text-gray-400 text-sm mt-4">{answer}</p>
      )}
    </div>
  );
}