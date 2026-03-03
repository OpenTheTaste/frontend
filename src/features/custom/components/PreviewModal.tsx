'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { MOCK_PREVIEWS } from '@/entities/custom/constants/factors';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  const [feedback, setFeedback] = useState<Record<number, 'good' | 'bad' | null>>({
    1: null,
    2: null,
    3: null,
  });

  const toggleFeedback = (id: number, type: 'good' | 'bad') => {
    setFeedback((prev) => ({ ...prev, [id]: prev[id] === type ? null : type }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-ot-gray-900 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">추천 미리보기</h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-ot-gray-400 hover:text-ot-text transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-ot-gray-400 mb-5">
          설정한 가중치로 추천된 콘텐츠입니다. 마음에 드시나요?
        </p>

        <div className="flex flex-col gap-4">
          {MOCK_PREVIEWS.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-ot-gray-800 rounded-xl p-4">
              <div className="relative w-20 h-14 rounded-lg bg-ot-gray-700 shrink-0 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-ot-gray-400">{item.genre}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeedback(item.id, 'good')}
                  className={`p-2 rounded-lg transition cursor-pointer ${
                    feedback[item.id] === 'good'
                      ? 'bg-ot-primary-400 text-ot-text'
                      : 'bg-ot-gray-700 text-ot-gray-400 hover:bg-ot-gray-600'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFeedback(item.id, 'bad')}
                  className={`p-2 rounded-lg transition cursor-pointer ${
                    feedback[item.id] === 'bad'
                      ? 'bg-ot-gray-500 text-ot-text'
                      : 'bg-ot-gray-700 text-ot-gray-400 hover:bg-ot-gray-600'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-ot-primary-400 text-ot-text rounded-xl font-semibold hover:opacity-90 transition cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
}
