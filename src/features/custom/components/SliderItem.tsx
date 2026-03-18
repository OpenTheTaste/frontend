import type { Factor } from "@entities/custom/constants";

interface SliderItemProps {
  factorKey: Factor;
  value: number;
  remaining: number;
  onChange: (key: Factor, value: number) => void;
}

export function SliderItem({
  factorKey,
  value,
  remaining,
  onChange,
}: SliderItemProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="bg-ot-primary-50 text-ot-primary-600 w-30 shrink-0 rounded-lg py-2.5 text-center text-sm font-semibold">
        {factorKey}
      </span>
      <div className="flex flex-1 items-center gap-2">
        <span className="text-ot-gray-600 w-4 text-xs">0</span>
        <input
          type="range"
          min={0}
          max={100}
          step={10}
          value={value}
          onChange={(e) => onChange(factorKey, Number(e.target.value))}
          className="accent-ot-primary-400 flex-1 cursor-pointer"
          disabled={value === 0 && remaining === 0}
        />
        <span className="text-ot-gray-600 w-8 text-right text-xs">100</span>
      </div>
      <span
        className={`w-7 text-right text-sm font-bold transition-colors ${
          value > 0 ? "text-ot-primary-400" : "text-ot-gray-600"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
