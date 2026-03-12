import { BackButton } from "@base-components";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ot-background">
      {/* 헤더부분 */}
      <header className="px-6 py-4">
        <BackButton />
      </header>

      <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 px-6 py-4">
        <h1 className="text-lg font-semibold text-ot-text text-center">개인정보처리방침</h1>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-8">
        {/* Intro */}
        <div className="mb-8 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <p className="text-sm leading-relaxed text-ot-text">
            &quot;O+T&quot;는 정보주체의 자유와 권리 보호를 위해「개인정보 보호법」및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에「개인정보 보호법」제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
        </div>

        {/* Article 1 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제 1조 (개인정보 처리 목적)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="space-y-2 text-sm text-ot-text">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              회원 가입의사 확인
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              회원자격 유지·관리
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              회원 식별
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              서비스 부정 이용 방지
            </li>
          </ul>
        </section>

        {/* Article 2 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제 2조 (처리하는 개인정보 항목)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다. 해당 개인정보는 귀하가 직접 제공하는 데이터와 귀하의 서비스 이용을 위해 회사가 자동으로 수집하는 개인 데이터를 모두 포함합니다.
          </p>
          
          {/* Table 1 */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-800/50">
                  <th className="px-3 py-2 text-left font-medium text-ot-text">수집 목적</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">필수 여부</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">수집 항목</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">이용 목적</th>
                </tr>
              </thead>
              <tbody className="text-ot-text">
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3 align-top">회원가입 및 로그인 정보</td>
                  <td className="px-3 py-3 align-top">필수</td>
                  <td className="px-3 py-3 align-top">카카오톡 로그인: 카카오톡 계정 정보, 성명, 생년월일, 월 수입, 암호화된 접속정보(CI), 중복가입정보(DI)</td>
                  <td className="px-3 py-3 align-top">개인 식별 및 회원 관리, 서비스 방문 및 이용 기록 분석, 각종 고지 및 통지, 문의 또는 불만 처리</td>
                </tr>
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3 align-top">OTT콘텐츠 내용 관리</td>
                  <td className="px-3 py-3 align-top">필수/선택</td>
                  <td className="px-3 py-3 align-top">관심사, 시청이력</td>
                  <td className="px-3 py-3 align-top">맞춤형 콘텐츠 추천, 맞춤형 콘텐츠 추천 대시보드 관리</td>
                </tr>
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3 align-top">모바일 서비스 이용</td>
                  <td className="px-3 py-3 align-top">필수</td>
                  <td className="px-3 py-3 align-top">모바일 단말기 정보(모델명, 디바이스 아이디, MAC 주소, OS), IP주소, 쿠키, 접속시간, 서비스이용기록</td>
                  <td className="px-3 py-3 align-top">각종 고지 및 통지, 문의 또는 불만 처리, 개인정보 침해 사고에 대한 대비, 분쟁 조정을 위한 기록 보존</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ② 간편(소셜)로그인 이용을 위해 제공받은 정보는 회원가입이 진행되지 않은 경우 즉시 파기합니다.
          </p>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ③ 회원가입 및 서비스 이용 과정에서 아래와 같은 최소한의 개인정보를 수집하고 있으며, 이용자의 동의 없이 &quot;민감정보&quot;는 수집하지 않습니다.
          </p>

          {/* Table 2 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-800/50">
                  <th className="px-3 py-2 text-left font-medium text-ot-text">구분</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">내용</th>
                </tr>
              </thead>
              <tbody className="text-ot-text">
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3">필수정보</td>
                  <td className="px-3 py-3">해당 서비스의 본질적 기능을 수행하기 위해 필요한 정보</td>
                </tr>
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3">선택정보</td>
                  <td className="px-3 py-3">이용자에게 보다 특화된 서비스를 제공하기 위해 추가적으로 수집하는 정보 (단, 선택 정보에 대한 동의를 거부하더라도 서비스 이용에 제한이 없음)</td>
                </tr>
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3">민감정보</td>
                  <td className="px-3 py-3">이용자의 사생활을 침해할 우려가 있는 정보 (인종, 사상 및 신조, 정치적 성향이나 범죄 기록 등)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Article 3 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제 3조 (개인정보의 처리 및 보유 기간)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 원칙적으로 이용자로부터 별도 동의를 받은 기간 동안 개인정보를 보유 및 이용하며, 회원 탈퇴, 개인정보의 수집 및 이용 목적이 달성된 경우에는 개인정보를 지체 없이 파기합니다. 다만, 회원 탈퇴 및 개인정보의 수집 및 이용 목적이 달성되더라도 법령 및 서비스 정책에 따라 일정기간 보관할 수 있습니다.
          </p>
          
          <h3 className="mb-3 text-sm font-medium text-ot-text">[법령에 따른 개인정보 처리 및 보유기간]</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700 bg-zinc-800/50">
                  <th className="px-3 py-2 text-left font-medium text-ot-text">보유 정보</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">보유 항목</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">보유 근거</th>
                  <th className="px-3 py-2 text-left font-medium text-ot-text">보유 기간</th>
                </tr>
              </thead>
              <tbody className="text-ot-text">
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3 align-top">소비자의 불만 또는 분쟁 처리에 관한 기록</td>
                  <td className="px-3 py-3 align-top">회원번호, 이름, 이메일 주소, 상담 기록, 불만 또는 분쟁 처리 결과</td>
                  <td className="px-3 py-3 align-top">「전자상거래 등에서의 소비자 보호에 관한 법률」제6조</td>
                  <td className="px-3 py-3 align-top">3년</td>
                </tr>
                <tr className="border-b border-ot-gray-800">
                  <td className="px-3 py-3 align-top">서비스 이용 관련 로그인 기록</td>
                  <td className="px-3 py-3 align-top">로그인 기록</td>
                  <td className="px-3 py-3 align-top">「통신비밀보호법」제15조의2</td>
                  <td className="px-3 py-3 align-top">3개월</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Article 4 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제4조 (개인정보의 제3자 제공에 관한 사항)</h2>
          <p className="text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 정보주체의 동의, 법률의 특별한 규정 등「개인정보 보호법」제17조 및 제18조에 해당하는 경우에 한하여 개인정보를 제3자에게 제공합니다.
          </p>
        </section>

        {/* Article 5 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제5조 (개인정보의 파기절차 및 파기방법)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ② 정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 위 &quot;제 3조 (개인정보의 처리 및 보유기간)&quot; 에 따라 보관한 후 파기합니다.
          </p>
          <p className="mb-2 text-sm leading-relaxed text-ot-text">③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
          <ul className="space-y-2 text-sm text-ot-text">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              <span><strong>파기 절차:</strong> &quot;O+T&quot;는 파기 사유가 발생한 개인정보를 지체 없이 파기합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              <span><strong>파기 방법:</strong> 전자적 파일 형태의 정보는 복구 및 재생할 수 없도록 파기하며, 종이 문서에 기록 및 저장된 개인정보는 분쇄하거나 소각하여 파기합니다.</span>
            </li>
          </ul>
        </section>

        {/* Article 6 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제6조 (정보주체와 법정대리인의 권리 의무 및 행사방법에 관한 사항)</h2>
          <div className="space-y-3 text-sm leading-relaxed text-ot-text">
            <p>① 정보주체는 &quot;O+T&quot;에 대해「개인정보 보호법」제35조, 제 36조, 제 37조에 따라 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
            <p>② 개인정보 처리에 대한 동의 철회(회원 탈퇴)는 서비스 내 &quot;서비스 탈퇴&quot; 기능을 이용하여 직접 신청할 수 있으며, 탈퇴 시 보유한 개인정보는 지체 없이 파기됩니다.</p>
            <p>③ 불가피한 사유로 직접 개인정보의 정정, 삭제(회원 탈퇴)가 어려운 경우, 회사가 제공하는 서면, 전화, 이메일, 연락처를 이용하여 이용자가 고객센터에 연락하면 지체 없이 요청사항을 조치하도록 하겠습니다.</p>
            <p>④ 개인정보의 오류에 대한 정정을 요청하는 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.</p>
            <p>⑤ 권리 행사는 이용자의 법정 대리인, 위임을 받은 자 등 대리인을 통하여 할 수 있습니다. 이 경우, &quot;개인정보 처리 방법에 관한 고시&quot; 별지 제11호 서식에 따른 위임장을 제출해야 합니다.</p>
            <p>⑥ 개인정보 열람 및 처리 정지를 요구하는 경우, 법률에 특별한 규정이 있거나 법령 상 의무를 준수하기 위하여 불가피한 경우, 다른 사람의 생명 및 신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우에는 사유를 알리고 제한하거나 거절할 수 있습니다.</p>
            <p>⑦ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p>
            <p>⑧ 회사는 이용자의 권리에 따른 열람의 요구, 정정 및 삭제의 요구, 처리 정지 또는 동의 철회 등의 요구 요청자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
            <p>⑨ 만 14세 미만 아동에 관한 개인정보의 열람 등의 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.</p>
          </div>
        </section>

        {/* Article 7 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제7조 (개인정보의 안정성 확보 조치에 관한 사항)</h2>
          <p className="mb-3 text-sm leading-relaxed text-ot-text">① &quot;O+T&quot;는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul className="space-y-2 text-sm text-ot-text">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              개인정보 취급자 지정 및 최소한으로 제한
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              개인정보 처리시스템 접근 권한의 관리
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              개인정보의 암호화
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
              모바일 앱의 접근 권한 관리 및 동의 철회 방법 등
            </li>
          </ul>
        </section>

        {/* Article 8 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제8조 (행태정보 수집 이용 및 거부 등에 관한 사항)</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ot-text">
            <p>① &quot;O+T&quot;는 서비스 이용 과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집 및 이용하고 있습니다.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
                <span><strong>행태정보 수집 방법:</strong> 이용자가 당사 앱을 방문하거나 앱을 실행할 때 자동 수집 및 전송</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
                <span><strong>행태정보 수집 목적:</strong> 이용자의 관심, 성향에 기반한 개인 맞춤형 소지품 추천 서비스(광고 포함)를 제공</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
                <span><strong>수집·처리되는 행태정보 항목:</strong> 이용자의 앱 방문 이력, 사용 이력</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ot-primary-600" />
                <span><strong>보유·이용기간 및 이후 정보 처리 방법:</strong> 수집일로부터 최대 1년간 보관 후 파기</span>
              </li>
            </ul>
            <p>② &quot;O+T&quot;는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 민감한 행태정보를 수집하지 않습니다.</p>
            <p>③ &quot;O+T&quot;는 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.</p>
            <p>④ &quot;O+T&quot;는 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.</p>
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/30 p-4">
              <p className="mb-2 font-medium">스마트폰의 광고식별자 차단/허용</p>
              <ul className="space-y-1 text-zinc-400">
                <li><strong>안드로이드:</strong> 설정 → 개인정보보호 → 광고 → 광고 ID 재설정 또는 맞춤 광고 사용 안함</li>
                <li><strong>아이폰:</strong> 설정 → 개인정보보호 → 추적 → 앱이 추적을 요청하도록 허용 끔</li>
              </ul>
              <p className="mt-2 text-xs text-zinc-500">※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.</p>
            </div>
            <p>⑤ 정보주체는 웹 브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동 로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.</p>
          </div>
        </section>

        {/* Article 9 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제9조 (개인정보 보호책임자에 관한 사항)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① &quot;O+T&quot;는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등에 관한 사항을 아래의 연락처로 문의하실 수 있습니다. &quot;O+T&quot;는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드리겠습니다.
          </p>
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/30 p-4">
            <p className="text-sm text-ot-text">
              <strong>문의처:</strong>{" "}
              <a href="mailto:vpffp368@naver.com" className="text-ot-primary-600 hover:underline">
                vpffp368@naver.com
              </a>
            </p>
          </div>
        </section>

        {/* Article 10 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제10조 (정보주체의 권익침해에 대한 구제방법)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대해서는 아래의 기관에 문의하시기 바랍니다.
          </p>
          <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-800/30 p-4 text-sm text-ot-text">
            <p>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</p>
            <p>개인정보침해 신고센터: (국번없이) 118 (privacy.kisa.or.kr)</p>
            <p>대검찰청: (국번없이) 1301 (www.spo.go.kr)</p>
            <p>경찰청 사이버범죄 신고시스템: (국번없이) 182 (유료) (ecrm.cyber.go.kr)</p>
          </div>
        </section>

        {/* Article 11 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제11조 (개인정보처리방침의 적용 범위)</h2>
          <div className="space-y-3 text-sm leading-relaxed text-ot-text">
            <p>① 본 개인정보처리방침은 회사의 서비스인 &quot;O+T&quot;에 적용됩니다. 회사는 회원에게 다른 회사의 서비스나 웹사이트 링크를 제공할 수 있습니다. 이 경우, 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다.</p>
            <p>② 본 개인정보처리방침은 각 국가별로 법률의 요구사항에 따라 언어별로 상이할 수 있습니다. 각 언어별 개인정보처리방침의 내용이 서로 충돌하는 경우에는 그 지역의 언어로 작성된 개인정보처리방침이 우선 적용되며, 그 지역의 언어로 작성된 개인정보처리방침이 없을 경우에는 영어로 작성된 개인정보처리방침이 적용됩니다.</p>
          </div>
        </section>

        {/* Article 12 */}
        <section className="mb-6 rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
          <h2 className="mb-4 text-base font-semibold text-ot-primary-600">제12조 (개인정보 처리방침의 변경에 관한 사항)</h2>
          <p className="mb-4 text-sm leading-relaxed text-ot-text">
            ① 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 서비스 공지사항을 통해 안내할 것입니다. 만약 법령 상 이용자 동의가 필요한 경우, 별도의 동의를 받습니다.
          </p>
          <div className="rounded-xl border border-ot-primary-800 bg-ot-background p-4">
            <p className="text-sm font-medium text-ot-text">
              개인정보 처리방침 시행일자: 2026. 03. 20
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pb-12 text-center">
          <p className="text-xs text-zinc-500">© 2026 O+T. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
