'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  FACTORS,
  GENRES,
  INITIAL_VALUES,
  GUIDE_ITEMS,
  type Factor,
} from '../constants/factors';
import { RadarChart } from '@features/custom/components/RadarChart';
import { SliderItem } from '@features/custom/components/SliderItem';
import { PreviewModal } from '@features/custom/components/PreviewModal';

export function CustomSetting() {
  const router = useRouter();

  const [genre, setGenre] = useState('템플릿');
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const [values, setValues] = useState<Record<Factor, number>>(INITIAL_VALUES);
  const [chartValues, setChartValues] = useState<Record<Factor, number>>(INITIAL_VALUES);

  const [isRecommended, setIsRecommended] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const total = FACTORS.reduce((sum, f) => sum + values[f], 0);
  const remaining = 100 - total;
  const isComplete = remaining === 0;

  const handleSliderChange = (key: Factor, raw: number) => {
    const otherTotal = total - values[key];
    const capped = Math.min(raw, 100 - otherTotal);
    setValues((prev) => ({ ...prev, [key]: capped }));
  };

  const handleRecommend = () => {
    if (!isComplete) return;
    setChartValues({ ...values });
    setIsRecommended(true);
  };

  return (
    <div className="min-h-screen text-ot-text">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => router.back()}
            className="cursor-pointer text-ot-gray-400 hover:text-ot-text transition"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <h1 className="text-3xl font-bold">나만의 O+T 커스텀 설정</h1>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* 왼쪽: 레이더 차트 */}
          <div className="bg-ot-gray-900 rounded-2xl p-10 flex items-center justify-center min-h-[500px]">
            <div className="w-full h-[450px]">
              <RadarChart values={chartValues} />
            </div>
          </div>

          {/* 오른쪽: 슬라이더 패널 */}
          <div className="bg-ot-gray-900 rounded-2xl p-8 flex flex-col">
            {/* 상단 바 */}
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-bold">요소별 값 설정</h2>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                    isComplete
                      ? 'bg-ot-primary-400 text-white'
                      : 'bg-ot-gray-800 text-ot-gray-400'
                  }`}
                >
                  남은 포인트 {remaining}
                </span>

                {/* 장르 드롭다운 */}
                <div className="relative">
                  <button
                    onClick={() => setIsGenreOpen((p) => !p)}
                    className="flex items-center gap-1.5 text-sm bg-ot-gray-800 px-3 py-1.5 rounded-full hover:bg-ot-gray-700 transition cursor-pointer"
                  >
                    {genre}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {isGenreOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-ot-gray-800 rounded-xl overflow-hidden z-10 shadow-lg min-w-28">
                      {GENRES.map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            setGenre(g);
                            setIsGenreOpen(false);
                          }}
                          className="block w-full px-4 py-2.5 text-sm hover:bg-ot-gray-700 text-left transition cursor-pointer"
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 슬라이더 목록 */}
            <div className="flex flex-col gap-4 flex-1">
              {FACTORS.map((key) => (
                <SliderItem
                  key={key}
                  factorKey={key}
                  value={values[key]}
                  remaining={remaining}
                  onChange={handleSliderChange}
                />
              ))}
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 mt-8">
              <button
                disabled={!isRecommended}
                onClick={() => isRecommended && setIsPreviewOpen(true)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${
                  isRecommended
                    ? 'bg-ot-secondary-800 text-ot-text hover:bg-ot-secondary-600 cursor-pointer'
                    : 'bg-ot-gray-800 text-ot-text cursor-not-allowed'
                }`}
              >
                추천 미리보기
              </button>
              <button
                disabled={!isComplete}
                onClick={handleRecommend}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${
                  isComplete
                    ? 'bg-ot-primary-gradient text-ot-text hover:opacity-90 cursor-pointer'
                    : 'bg-ot-gray-800 text-ot-text cursor-not-allowed'
                }`}
              >
                추천받기
              </button>
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">사용 가이드</h2>
          <div className="bg-ot-gray-900 rounded-2xl p-8 text-ot-gray-400 text-sm leading-8">
            <ol className="list-decimal list-inside space-y-1 mb-5">
              <li>
                가중치 조절 : 오른쪽 슬라이더 바를 움직여 대중성, 몰입도 등 6가지 요소의 값을
                0에서 100 사이로 자유롭게 설정하세요.
              </li>
              <li>
                차트 확인 : 설정한 수치에 따라 왼쪽의 육각형 레이더 차트가 추천받기 버튼을
                누르면 변하며 당신의 추천 로직을 시각화합니다.
              </li>
              <li>
                커스텀 완료 : 원하는 가중치가 완성되었다면 하단의 &apos;추천받기&apos; 버튼을
                눌러 당신만을 위한 화이트박스 추천 리스트를 확인하세요.
              </li>
            </ol>
            <ul className="list-disc list-inside space-y-1">
              {GUIDE_ITEMS.map(({ key, en, desc }) => (
                <li key={key}>
                  <strong className="text-ot-text">
                    {key} ({en})
                  </strong>{' '}
                  : {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
}
