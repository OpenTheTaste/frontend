"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "./queryClient";

/**
 * QueryClient를 React Context로 제공
 *  = 전역으로 접근 가능하도록 설정
 */
export default function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
