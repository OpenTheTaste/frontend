import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/auth", "/api/auth"]; // kakao oauth 콜백 경로 추가

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (isDev) {
    return NextResponse.next();
  }

  // FIXME: 마지막에 주석 지우기!!
  // FIXME: 개발환경에서 영상 play 해보고 싶다면 아래 주석 살린 뒤, cookie에 저장된 3개의 CloudFront Cookies -> .env.local에 저장해서 서버 재실행 -> s3에 업로드 되어 있는 영상 확인 가능
  // if (isDev) {
  //   const response = NextResponse.next();

  //   const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
  //   const policy = process.env.CLOUDFRONT_POLICY;
  //   const signature = process.env.CLOUDFRONT_SIGNATURE;

  //   if (keyPairId && policy && signature) {
  //     response.cookies.set("CloudFront-Key-Pair-Id", keyPairId, { path: "/" });
  //     response.cookies.set("CloudFront-Policy", policy, { path: "/" });
  //     response.cookies.set("CloudFront-Signature", signature, { path: "/" });
  //   }

  //   return response;
  // }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
