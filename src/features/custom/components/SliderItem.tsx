import type { Factor } from '../constants/factors';

interface SliderItemProps {
  factorKey: Factor;
  value: number;
  remaining: number;
  onChange: (key: Factor, value: number) => void;
}

export function SliderItem({ factorKey, value, remaining, onChange }: SliderItemProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-30 shrink-0 text-sm font-semibold bg-ot-primary-50 text-ot-primary-600 text-center py-3 rounded-lg">
        {factorKey}
      </span>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-xs text-ot-gray-600 w-4">0</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(factorKey, Number(e.target.value))}
          className="flex-1 accent-ot-primary-400 cursor-pointer"
          disabled={value === 0 && remaining === 0}
        />
        <span className="text-xs text-ot-gray-600 w-8 text-right">100</span>
      </div>
      <span
        className={`w-7 text-right text-sm font-bold transition-colors ${
          value > 0 ? 'text-ot-primary-400' : 'text-ot-gray-600'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
