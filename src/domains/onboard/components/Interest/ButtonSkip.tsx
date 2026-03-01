'use client';

import { useRouter } from "next/navigation";
import { CommonButton } from "@basecomponent";

export const ButtonSkip = () => { 
    const router = useRouter();

    return (
        <CommonButton
            onClick={() => router.push('/')}
            className="w-1/2 py-4 text-[1rem] font-bold"
            variant="secondary"
        >
            건너뛰기
        </CommonButton>
    );
} 