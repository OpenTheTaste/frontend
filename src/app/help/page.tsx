import {
  Image,
  Lightbulb,
  Mail,
  MessageSquare,
  Smartphone,
  User,
} from "lucide-react";
import { BackButton } from "@base-components";
import { HeaderBrand } from "@features/auth/components";

export default function HelpPage() {
  return (
    <div className="bg-ot-background text-ot-text min-h-screen">
      {/* 헤더부분 */}
      <header className="px-6 py-4">
        <HeaderBrand />
        <div className="relative top-1 right-6 py-2">
          <BackButton />
        </div>
      </header>
      {/* 메인 */}
      <main className="px-12 py-12">
        {/* 제목 (시작 부분) */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance">문의하기</h1>
          <p className="text-ot-gray-700 text-sm leading-relaxed">
            피드백이 있으시거나 도움이 필요하신 경우,
            <br />
            아래 채널을 통해 언제든 문의해주세요.
          </p>
        </div>

        {/* 안내 문구 */}
        <div className="bg-ot-gray-900 border-ot-gray-900 mb-12 rounded-2xl border p-6">
          <p className="text-ot-gray-600 text-sm leading-relaxed">
            서비스를 이용하시면서 느끼신 불편 사항, 개선 아이디어, 혹은 단순한
            응원 메시지까지 모두 남기실 수 있어요.
          </p>
          <p className="text-ot-gray-600 mt-2 text-sm leading-relaxed">
            남겨주신 소중한 의견은 빠른 시일 내에 확인하여, 서비스 개선에 적극
            반영하도록 하겠습니다.
          </p>
        </div>

        {/* 이메일 연락처 */}
        <div className="mb-7 rounded-2xl border border-(--ot-primary-600)/20 bg-linear-to-br from-(--ot-primary-600)/10 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--ot-primary-600)">
              <Mail className="text-ot-text h-5 w-5" />
            </div>
            <div>
              <p className="text-ot-gray-500 mb-1 text-xs">이메일 문의</p>
              <a
                href="mailto:vpffp368@naver.com"
                className="text-ot-text hover:text-ot-primary-600 font-medium transition-colors"
              >
                vpffp368@naver.com
              </a>
            </div>
          </div>
        </div>

        {/* 이메일 문의 가이드 */}
        <div className="bg-ot-gray-900 border-ot-gray-800 overflow-hidden rounded-2xl border">
          <div className="border-ot-gray-800 flex items-center gap-2 border-b px-6 py-4">
            <Lightbulb className="text-ot-primary-600 h-4 w-4" />
            <h2 className="text-base font-semibold">이메일 문의 양식</h2>
          </div>

          <div className="space-y-5 p-6">
            {/* 서비스 내 사용 중인 이름 */}
            <div className="flex gap-4">
              <div className="bg-ot-secondary-950 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <User className="text-ot-secondary-500 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-ot-gray-400 mb-1 text-sm font-medium">
                  서비스 내 사용 중인 이름
                </h3>
                <p className="text-ot-gray-700 text-xs leading-relaxed">
                  O+T [마이페이지]에서 확인하실 수 있어요.
                </p>
              </div>
            </div>

            {/* 이메일 주소 */}
            <div className="flex gap-4">
              <div className="bg-ot-secondary-950 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Mail className="text-ot-secondary-500 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-ot-gray-400 mb-1 text-sm font-medium">
                  이메일 주소
                </h3>
                <p className="text-ot-gray-700 text-xs leading-relaxed">
                  답변을 원하실 경우 이메일 주소를 꼭 남겨주세요.
                </p>
              </div>
            </div>

            {/* 사용 중인 기기 / OS */}
            <div className="flex gap-4">
              <div className="bg-ot-secondary-950 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Smartphone className="text-ot-secondary-500 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-ot-gray-400 mb-1 text-sm font-medium">
                  사용 중인 기기 / OS
                </h3>
                <p className="text-ot-gray-700 text-xs leading-relaxed">
                  ex. iPhone 15, Galaxy S24 Ultra, iOS 17.0
                </p>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="flex gap-4">
              <div className="bg-ot-secondary-950 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <MessageSquare className="text-ot-secondary-500 h-4 w-4" />
              </div>
              <div>
                <h3 className="text-ot-gray-400 mb-1 text-sm font-medium">
                  문의 내용
                </h3>
                <p className="text-ot-gray-700 text-xs leading-relaxed">
                  자세히 작성해주시면 더욱 빠르게 서비스 개선이 이뤄질 수
                  있어요.
                </p>
              </div>
            </div>

            {/* 스크린샷 / 화면 녹화 */}
            <div className="flex gap-4">
              <div className="bg-ot-secondary-950 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Image
                  className="text-ot-secondary-500 h-4 w-4"
                  aria-label="이미지 설명 텍스트"
                />
              </div>
              <div>
                <h3 className="text-ot-gray-400 mb-1 text-sm font-medium">
                  스크린샷 / 화면 녹화
                  <span className="text-ot-gray-600 ml-1 font-normal">
                    (선택 사항)
                  </span>
                </h3>
                <p className="text-ot-gray-700 text-xs leading-relaxed">
                  문제 상황을 이해하는 데 큰 도움이 되어요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <a
            href="mailto:vpffp368@naver.com"
            className="bg-ot-primary-600 hover:bg-ot-primary-700 text-ot-text inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-colors"
          >
            <Mail className="h-4 w-4" />
            이메일 보내기
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-ot-gray-700 px-6 py-8 text-center text-xs">
        © 2026 O+T. All rights reserved.
      </footer>
    </div>
  );
}
