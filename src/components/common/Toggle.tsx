import Image from "next/image";

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <div onClick={onToggle} className={`relative cursor-pointer w-4.75 h-3 shrink-0`}>
      <Image
        src={isOn ? "/icons/toggleon.svg" : "/icons/toggleoff.svg"}
        alt="toggle"
        width={19}
        height={12}
        className="object-contain"
      />
    </div>
  );
}
