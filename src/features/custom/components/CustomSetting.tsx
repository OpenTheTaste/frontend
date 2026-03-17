"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import {
  PreviewModal,
  RadarChart,
  SliderItem,
} from "@features/custom/components";
import type { RadarResponse } from "@entities/custom/apis";
import { CustomSettingSkeleton } from "@entities/custom/components";
import {
  CUSTOM_PRESETS,
  FACTORS,
  type Factor,
  GUIDE_ITEMS,
  INITIAL_VALUES,
} from "@entities/custom/constants";
import { usePutRadar, useRadar } from "@entities/custom/hooks";
import { cn } from "@shared/lib";

function toFactorValues(radar: RadarResponse): Record<Factor, number> {
  return {
    대중성: radar.popularity,
    몰입도: radar.immersion,
    마니아: radar.mania,
    최신성: radar.recency,
    재시청률: radar.reWatch,
  };
}

function toRadarResponse(values: Record<Factor, number>): RadarResponse {
  return {
    popularity: values["대중성"],
    immersion: values["몰입도"],
    mania: values["마니아"],
    recency: values["최신성"],
    reWatch: values["재시청률"],
  };
}

export function CustomSetting() {
  const router = useRouter();

  const [genre, setGenre] = useState<string>("템플릿");
  const [isGenreOpen, setIsGenreOpen] = useState<boolean>(false);

  const [isRecommended, setIsRecommended] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const { data: radarData, isLoading } = useRadar();
  const { mutate: putRadar } = usePutRadar();

  const serverValues = radarData ? toFactorValues(radarData) : INITIAL_VALUES;

  // null = 사용자가 아직 수정 안 함 → serverValues로 fallback
  const [localValues, setLocalValues] = useState<Record<Factor, number> | null>(
    null,
  );
  const [confirmedValues, setConfirmedValues] = useState<Record<
    Factor,
    number
  > | null>(null);

  const values = localValues ?? serverValues;
  const chartValues = confirmedValues ?? serverValues;

  const total = FACTORS.reduce((sum, f) => sum + values[f], 0);
  const remaining = 100 - total;
  const isComplete = remaining === 0;

  const handleSliderChange = (key: Factor, raw: number) => {
    const otherTotal = total - values[key];
    const capped = Math.min(raw, 100 - otherTotal);
    setLocalValues((prev) => ({ ...(prev ?? serverValues), [key]: capped }));
  };

  const handleRecommend = () => {
    if (!isComplete) return;
    setConfirmedValues({ ...values });
    setIsRecommended(true);
    putRadar(toRadarResponse(values));
  };

  if (isLoading) return <CustomSettingSkeleton />;

  return (
    <div className="text-ot-text min-h-screen">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* 헤더 */}
        <div className="mb-10 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-ot-gray-400 hover:text-ot-text cursor-pointer transition"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <h1 className="text-3xl font-bold">나만의 O+T 커스텀 설정</h1>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="mb-10 grid grid-cols-2 gap-6">
          {/* 왼쪽: 레이더 차트 */}
          <div className="bg-ot-gray-900 flex min-h-125 items-center justify-center rounded-2xl p-10">
            <div className="h-112.5 w-full">
              <RadarChart values={chartValues} />
            </div>
          </div>

          {/* 오른쪽: 슬라이더 패널 */}
          <div className="bg-ot-gray-900 flex flex-col rounded-2xl p-8">
            {/* 상단 바 */}
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-bold">요소별 값 설정</h2>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    isComplete
                      ? "bg-ot-primary-gradient text-ot-text"
                      : "bg-ot-gray-800 text-ot-gray-400"
                  }`}
                >
                  남은 포인트 {remaining}
                </span>

                {/* 장르 드롭다운 */}
                <div className="relative">
                  <button
                    onClick={() => setIsGenreOpen((p) => !p)}
                    className="bg-ot-gray-800 hover:bg-ot-gray-700 flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition"
                  >
                    {
                      Object.values(CUSTOM_PRESETS).find(
                        (p) => p.label === genre,
                      )?.icon
                    }{" "}
                    {genre}
                    <ChevronDown
                      size={12}
                      className={cn(
                        "text-ot-text shrink-0 transition-transform duration-200",
                        isGenreOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isGenreOpen && (
                    <div className="bg-ot-gray-800 absolute top-full right-0 z-10 mt-1 min-w-30 overflow-hidden rounded-xl shadow-lg">
                      {Object.values(CUSTOM_PRESETS).map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setIsRecommended(false);
                            if (preset.id === "reset") {
                              setGenre("템플릿");
                            } else {
                              setGenre(preset.label);
                            }
                            setLocalValues(preset.values);
                            setConfirmedValues(preset.values);
                            setIsGenreOpen(false);
                          }}
                          className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm transition ${
                            genre === preset.label
                              ? "bg-ot-gray-700"
                              : "hover:bg-ot-gray-700"
                          }`}
                        >
                          <span>{preset.icon}</span>
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 슬라이더 목록 */}
            <div className="flex flex-1 flex-col justify-center gap-4">
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
            <div className="mt-8 flex gap-4">
              <button
                disabled={!isRecommended}
                onClick={() => isRecommended && setIsPreviewOpen(true)}
                className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
                  isRecommended
                    ? "bg-ot-secondary-800 text-ot-text hover:bg-ot-secondary-600 cursor-pointer"
                    : "bg-ot-gray-800 text-ot-text cursor-not-allowed"
                }`}
              >
                추천 미리보기
              </button>
              <button
                disabled={!isComplete}
                onClick={handleRecommend}
                className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
                  isComplete
                    ? "bg-ot-primary-gradient text-ot-text cursor-pointer hover:opacity-90"
                    : "bg-ot-gray-800 text-ot-text cursor-not-allowed"
                }`}
              >
                추천받기
              </button>
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">사용 가이드</h2>
          <div className="bg-ot-gray-900 text-ot-gray-400 rounded-2xl p-8 text-sm leading-8">
            <ol className="mb-5 list-inside list-decimal space-y-1">
              <li>
                가중치 조절 : 오른쪽 슬라이더 바를 움직여 대중성, 몰입도 등
                6가지 요소의 값을 0에서 100 사이로 자유롭게 설정하세요.
              </li>
              <li>
                차트 확인 : 설정한 수치에 따라 왼쪽의 육각형 레이더 차트가
                추천받기 버튼을 누르면 변하며 당신의 추천 로직을 시각화합니다.
              </li>
              <li>
                커스텀 완료 : 원하는 가중치가 완성되었다면 하단의
                &apos;추천받기&apos; 버튼을 눌러 당신만을 위한 화이트박스 추천
                리스트를 확인하세요.
              </li>
            </ol>
            <ul className="list-inside list-disc space-y-1">
              {GUIDE_ITEMS.map(({ key, en, desc }) => (
                <li key={key}>
                  <strong className="text-ot-text">
                    {key} ({en})
                  </strong>{" "}
                  : {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
