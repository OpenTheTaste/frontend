'use client';

import { CommonButton } from "@base-components";

interface SkipBUttonProps { 
    onSkip: () => void;
}

export default function ButtonSkip({
    onSkip,
}: SkipBUttonProps) { 
    return (
     <CommonButton
        onClick={onSkip}
        className="w-1/2 py-4 text-[1rem] font-bold"
        variant="secondary"
     >
    건너뛰기
    </CommonButton>
    )
}