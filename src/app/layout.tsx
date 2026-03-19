import type { Metadata } from "next";
import { FloatingPlayer } from "@features/player/components";
import { UserInitializer } from "@shared/components";
import { QueryProvider } from "@shared/lib";
import "./globals.css";

export const metadata: Metadata = {
  title: "O+T | Open The Taste",
  description: "O+T | Open The Taste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-sans antialiased">
        <QueryProvider>
          <UserInitializer />
          {/* 최대 넓이 570 -> 2280px 지정 */}
          <div className="bg-ot-background mx-auto flex min-h-screen max-w-570 flex-col">
            {children}
            <FloatingPlayer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
