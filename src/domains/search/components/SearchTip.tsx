import { Lightbulb } from "lucide-react";

export default function SearchTip() {
  return (
    <div className="flex justify-center items-center flex-col gap-y-12">
      <div className="flex gap-x-4">
        <Lightbulb size={36} className="text-ot-primary-400" />
        <p className="text-3xl font-bold text-ot-text">검색 팁</p>
      </div>
      <div>
        <ul className="list-disc space-y-2 pl-5">
          <li>다른 콘텐츠 제목으로 검색해 보세요</li>
          <li>정확한 제목이나 일부 단어로 다시 시도해 보세요</li>
          <li>맞춤법을 확인해 보세요</li>
        </ul>
      </div>
    </div>
  );
}
