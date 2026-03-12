import { BackButton } from "@base-components";
import { Mail, Smartphone, User, MessageSquare, Image, Lightbulb } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-ot-background text-ot-text">
      {/* 헤더부분 */}
      <header className="px-6 py-4">
        <BackButton />
      </header>

      {/* 메인 */}
      <main className="px-12 py-12">
        {/* 제목 (시작 부분) */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">문의하기</h1>
          <p className="text-ot-gray-700 text-sm leading-relaxed">
            피드백이 있으시거나 도움이 필요하신 경우,
            <br />
            아래 채널을 통해 언제든 문의해주세요.
          </p>
        </div>

        {/* 안내 문구 */}
        <div className="bg-ot-gray-900 border border-ot-gray-900 rounded-2xl p-6 mb-12">
          <p className="text-ot-gray-600 text-sm leading-relaxed">
            서비스를 이용하시면서 느끼신 불편 사항, 개선 아이디어,
            혹은 단순한 응원 메시지까지 모두 남기실 수 있어요.
          </p>
          <p className="text-ot-gray-600 text-sm leading-relaxed mt-2">
            남겨주신 소중한 의견은 빠른 시일 내에 확인하여,
            서비스 개선에 적극 반영하도록 하겠습니다.
          </p>
        </div>

        {/* 이메일 연락처 */}
        <div className="bg-linear-to-br from-(--ot-primary-600)/10 to-transparent border border-(--ot-primary-600)/20 rounded-2xl p-6 mb-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-(--ot-primary-600) rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-ot-text" />
            </div>
            <div>
              <p className="text-xs text-ot-gray-500 mb-1">이메일 문의</p>
              <a
                href="mailto:vpffp368@naver.com"
                className="text-ot-text font-medium hover:text-ot-primary-600 transition-colors"
              >
                vpffp368@naver.com
              </a>
            </div>
          </div>
        </div>

        {/* 이메일 문의 가이드 */}
        <div className="bg-ot-gray-900 border border-ot-gray-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-ot-gray-800 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-ot-primary-600" />
            <h2 className="font-semibold text-base">이메일 문의 양식</h2>
          </div>

          <div className="p-6 space-y-5">
            {/* 서비스 내 사용 중인 이름 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-ot-secondary-950 rounded-lg flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-ot-secondary-500" />
              </div>
              <div>
                <h3 className="text-sm text-ot-gray-400 font-medium mb-1">서비스 내 사용 중인 이름</h3>
                <p className="text-xs text-ot-gray-700 leading-relaxed">
                  O+T [마이페이지]에서 확인하실 수 있어요.
                </p>
              </div>
            </div>

            {/* 이메일 주소 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-ot-secondary-950 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-ot-secondary-500" />
              </div>
              <div>
                <h3 className="text-sm text-ot-gray-400 font-medium mb-1">이메일 주소</h3>
                <p className="text-xs text-ot-gray-700 leading-relaxed">
                  답변을 원하실 경우 이메일 주소를 꼭 남겨주세요.
                </p>
              </div>
            </div>

            {/* 사용 중인 기기 / OS */}
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-ot-secondary-950 rounded-lg flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4 text-ot-secondary-500" />
              </div>
              <div>
                <h3 className="text-sm text-ot-gray-400 font-medium mb-1">사용 중인 기기 / OS</h3>
                <p className="text-xs text-ot-gray-700 leading-relaxed">
                  ex. iPhone 15, Galaxy S24 Ultra, iOS 17.0
                </p>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-ot-secondary-950 rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-ot-secondary-500" />
              </div>
              <div>
                <h3 className="text-sm text-ot-gray-400 font-medium mb-1">문의 내용</h3>
                <p className="text-xs text-ot-gray-700 leading-relaxed">
                  자세히 작성해주시면 더욱 빠르게 서비스 개선이 이뤄질 수 있어요.
                </p>
              </div>
            </div>

            {/* 스크린샷 / 화면 녹화 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 bg-ot-secondary-950 rounded-lg flex items-center justify-center shrink-0">
                <Image className="w-4 h-4 text-ot-secondary-500" aria-label="이미지 설명 텍스트"  />
              </div>
              <div>
                <h3 className="text-sm text-ot-gray-400 font-medium mb-1">
                  스크린샷 / 화면 녹화
                  <span className="text-ot-gray-600 font-normal ml-1">(선택 사항)</span>
                </h3>
                <p className="text-xs text-ot-gray-700 leading-relaxed">
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
            className="inline-flex items-center justify-center gap-2 bg-ot-primary-600 hover:bg-ot-primary-700 text-ot-text font-medium px-8 py-3 rounded-full transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            이메일 보내기
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-xs text-ot-gray-700">
        © 2026 O+T. All rights reserved.
      </footer>
    </div>
  );
}