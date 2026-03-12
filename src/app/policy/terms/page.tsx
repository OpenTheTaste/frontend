import { BackButton } from "@base-components";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ot-background text-ot-text">
      {/* 헤더부분 */}
      <header className="px-6 py-4">
        <BackButton />
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-ot-text text-3xl font-bold tracking-tight">서비스 이용약관</h1>
        </div>

        {/* Terms Content */}
        <div className="space-y-10">
          {/* 제1장 */}
          <section className="rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
            <h2 className="mb-6 text-xl font-semibold text-ot-primary-600">제1장 총칙</h2>

            <div className="space-y-6">
              <article>
                <h3 className="mb-3 font-medium text-ot-text">제1조 (목적)</h3>
                <p className="text-sm leading-relaxed text-ot-gray-600">
                  본 약관은 O+T(이하 &quot;본 서비스&quot;)에서 제공하는 온라인 서비스를 이용함에 있어 필요한 조건과 절차를 규정함을 목적으로 합니다. 이는 본 서비스에 카카오톡 로그인을 통해 접속하는 모든 이용자(이후  &quot;회원&quot;)에게 적용됩니다.
                </p>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제2조 (용어의 정의)</h3>
                <p className="mb-2 text-sm text-ot-gray-600">본 약관에서 사용하는 용어는 다음과 같이 정의합니다.</p>
                <ol className="list-inside list-decimal space-y-1 text-sm text-ot-gray-600">
                  <li>회원: 서비스에 개인정보를 제공하여 회원등록을 한 이용자로서, 서비스의 정보를 지속적으로 제공받으며 서비스를 이용하는 자</li>
                  <li>회사: 본 서비스를 제작 및 관리하는 조직</li>
                </ol>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제3조 (약관의 동의)</h3>
                <p className="text-sm leading-relaxed text-ot-gray-600">
                  회원이 되고자 하는 자는 로그인 및 회원가입의 절차를 거칠 시 회사가 정한  &quot;서비스 이용약관 &quot;에 동의하면, 본 약관에 동의하는 것으로 간주합니다.
                </p>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제4조 (효력의 발생과 변경)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 본 약관은 해당 내용을 회사의 웹사이트에 게시하거나 기타의 방법으로 회원에게 공시함으로써 효력이 발생합니다.</p>
                  <p>② 회사는 영업상 중요 사유, 사정 변경, 기타 회사가 필요하다고 인정하는 경우, 관련 법을 위배하지 않는 범위에서 약관의 내용을 개정할 수 있으며, 변경된 약관은 ①항과 같은 방법으로 효력이 발생됩니다.</p>
                  <p>③ 개정된 약관의 효력은 원칙적으로 기존 회원에게도 적용됩니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제5조 (준용규정)</h3>
                <p className="text-sm leading-relaxed text-ot-gray-600">
                  본 약관에 명시되지 않은 사항은 &quot;약관의 규제에 관한 법률&quot;, &quot;전자거래기본법&quot; 등 관계 법령의 규정에 따릅니다.
                </p>
              </article>
            </div>
          </section>

          {/* 제2장 */}
          <section className="rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
            <h2 className="mb-6 text-xl font-semibold text-ot-primary-600">제2장 이용계약</h2>

            <div className="space-y-6">
              <article>
                <h3 className="mb-3 font-medium text-ot-text">제6조 (회원의 가입과 이용신청)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회원이 되고자 하는 자는 회사에서 요청하는 개인의 정보를 정확하게 제공해야 합니다.</p>
                  <p>② 실명이나 실제 정보를 입력하지 않은 회원은 법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있습니다.</p>
                  <p>③ 회원가입은 회원이 되고자 하는 자가 본 약관과 개인정보 처리방침에 동의하고 회원 등록을 신청할 경우 회사가 승낙함으로써 이루어집니다.</p>
                  <p>④ 회사는 이용신청에 대하여 아래 사항에 해당하는 경우를 예외로 하여 원칙적으로 즉시 이용신청을 승낙합니다.</p>
                  <ul className="ml-4 mt-2 list-inside list-disc space-y-1">
                    <li>서비스 관련 설비에 여유가 없는 경우</li>
                    <li>기술상 지장이 있는 경우</li>
                    <li>기타 회사 사정상 필요하다고 인정되는 경우</li>
                  </ul>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제7조 (이용신청의 불승낙)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사는 다음 각호에 해당하는 경우 이용신청에 대하여 승낙을 하지 않을 수 있습니다.</p>
                  <ul className="ml-4 mt-2 list-inside list-disc space-y-1">
                    <li>회원가입 신청서 내용의 일부 또는 전부를 허위로 하여 신청한 경우</li>
                    <li>공공질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
                    <li>기타 회사가 정한 이용신청 요건이 미비한 경우</li>
                  </ul>
                  <p>② 회사는 이용신청에 대하여 승낙한 이후 해당 신청이 ①항 각호에 해당하는 사실을 알았을 경우 그 승낙을 취소할 수 있으며, 이 경우 해당 이용 신청은 처음부터 무효가 됩니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제8조 (계약사항의 변경)</h3>
                <p className="text-sm leading-relaxed text-ot-gray-600">
                  회원은 이용신청 시 기재한 사항이 변경되었을 경우, 서비스  &quot;마이페이지 &quot;에 있는 프로필 수정 기능을 통해 수정할 수 있습니다. 이외 수정사항을 요청해야할 경우 문의사항 기능을 이용할 수 있습니다.
                </p>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제9조 (회원 정보의 보호)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회원의 개인정보는 약관의 운용목적 이외의 목적으로 사용하거나 회원의 승낙 없이 타인에게 누설하거나 배포하지 않습니다. 단, 관련법에 의한 국가기관 등의 요구가 있을 경우나 회원의 불법적이거나 미풍양속을 저해하는 행위로 인한 귀책사유의 경우에는 그러하지 않습니다.</p>
                  <p>② 회사는 회원의 개인정보 보호를 위하여  &quot;개인정보 처리방침 &quot;을 수립하고 이를 준수합니다.  &quot;개인정보 처리방침 &quot;은 최초 회원 가입 시 서비스 이용약관과 함께 게재하고 있으며, 홈페이지 하단에 명시하여 언제라도 회원이 해당 내용을 확인할 수 있도록 하고 있습니다.</p>
                  <p>③ 회원의 개인정보는 관계 법령에 따른 회사의 개인정보 처리방침 및 기타 내부운영방침에 의거하여 기술적, 물리적으로 안전하게 관리되고 있습니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제10조 (서비스의 이용 및 제한)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 서비스는 회사의 사정상 또는 기술상 특별한 사정이 있는 경우를 예외로 하여 연중무휴, 1일 24시간 이용을 원칙으로 합니다.</p>
                  <p>② 회사가 제공하는 서비스 중 일부는 회사가 정한 별도의 로그인 및 정보 입력 절차를 거쳐야만 이용할 수 있습니다.</p>
                  <p>③ 회사는 컴퓨터 등 정보통신설비의 보수점검 및 교체/고장/통신의 두절 등의 사유가 발생한 경우에 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체 또는 기타 회사가 적절하다고 판단하는 경우 현재 제공하는 서비스를 완전히 중단할 수 있습니다.</p>
                  <p>④ 회사는 서비스 중단 시 회원에게 이를 공지하여야 합니다. 다만, 회사가 통제할 수 없는 사유로 인한 서비스의 중단으로 공지가 불가능한 경우에는 그러하지 않습니다.</p>
                </div>
              </article>
            </div>
          </section>

          {/* 제3장 */}
          <section className="rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
            <h2 className="mb-6 text-xl font-semibold text-ot-primary-600">제3장 계약 당사자의 의무</h2>

            <div className="space-y-6">
              <article>
                <h3 className="mb-3 font-medium text-ot-text">제11조 (회사의 의무)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사는 회원의 신용정보를 포함한 개인신상정보의 보안에 대하여 기술적 안전조치를 강구하고 관리에 만전을 기함으로써 회원의 개인정보 보안에 최선을 다해야 합니다.</p>
                  <p>② 회사는 서비스 이용에 관한 사항, 회사의 각종 행사 또는 정보 서비스에 대한 정보를 회사 홈페이지, 전자우편이나 서신우편, 전화 등의 방법으로 회원들에게 제공할 수 있습니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제12조 (회원의 의무)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회원은 본인의 개인정보가 분실/도용/위조/변조되지 않도록 충분한 주의를 기울여야 하며, 이에 대한 관리 소홀 및 부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원이 부담합니다.</p>
                  <p>② 회원의 개인정보가 부정하게 사용된 경우에 회원은 즉시 관련 카카오톡/애플 계정 비밀번호를 바꾸고 그 사실을 회사에 통보해야 합니다.</p>
                  <p>③ 회원은 회원의 귀책사유로 인하여 회사나 다른 회원이 입은 손해를 배상할 책임이 있습니다.</p>
                  <p>④ 본인의 카카오톡/애플 계정 관리 및 비밀번호 보안에 대한 관리책임은 회원에게 있으며, 해당 계정이 도용되거나 부정 사용되는 경우 발생하는 문제에 대해 회사는 책임을 지지 않습니다.</p>
                  <p>⑤ 회사의 귀책사유 없이 카카오톡계정의 유출, 양도, 대여로 인하여 발생하는 손실이나 손해에 대하여는 회원 본인이 그에 대한 책임을 부담합니다.</p>
                  <p>⑥ 회원은 본인의 카카오톡 계정을 도난당하거나 제3자가 무단으로 이를 사용하고 있음을 인지한 경우 이를 즉시 회사에 통보하여야 합니다.</p>
                </div>
              </article>
            </div>
          </section>

          {/* 제4장 */}
          <section className="rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
            <h2 className="mb-6 text-xl font-semibold text-ot-primary-600">제4장 서비스 이용</h2>

            <div className="space-y-6">
              <article>
                <h3 className="mb-3 font-medium text-ot-text">제13조 (계약해지 및 서비스의 이용제한)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회원은 이용신청을 해지하고자 하는 경우, 서비스 내  &quot;마이페이지 &quot;에서 서비스 탈퇴 신청을 하여야 하며, 회사는 신속히 처리하여야 합니다.</p>
                  <p>② 회사는 회원의 서비스 이용행위가 다음 사항에 해당하는 경우 이용신청을 해지하거나 서비스의 이용을 중지할 수 있습니다.</p>
                  <ul className="ml-4 mt-2 list-inside list-disc space-y-1">
                    <li>공공 질서 및 미풍양속에 반하는 경우</li>
                    <li>범죄와 관련 있다고 추정되는 경우</li>
                    <li>국익 또는 공공의 이익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우</li>
                    <li>타인의 정보를 도용한 경우</li>
                    <li>타인의 명예를 손상시키거나 불이익을 주는 경우</li>
                    <li>같은 회원이 다른 개인정보로 이중 등록을 한 경우</li>
                    <li>서비스에 위해를 가하는 등 건전한 이용을 저해하는 경우</li>
                    <li>기타 관계법령이나 회사가 정한 이용조건에 위배되는 경우</li>
                  </ul>
                  <p>③ 회사가 이용을 제한하고자 하는 경우에는 해당 사유, 일시 및 기간을 정하여 전자우편 등의 방법으로 해당 회원 또는 대리인에게 통지합니다. 다만, 회사가 긴급하게 이용을 정지할 필요가 있다고 인정하는 경우에는 그러하지 아니합니다.</p>
                  <p>④ 회사는 이용정지기간 중에 해당 이용제한사유가 해소된 것이 확인된 경우에는 이용정지조치를 즉시 해제합니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제14조 (저작권의 귀속 및 이용제한)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
                  <p>② 회원은 회사의 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제/전송/출판/배포/방송/기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제15조 (데이터의 활용과 서비스 관리)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사는 본 서비스의 유지 및 개선을 위하여 관계 법령을 준수하는 범위에서 귀하가 입력한 데이터를 저장한 후, 서비스 고도화 및 최적화 등의 목적으로 활용할 수 있습니다.</p>
                  <p>② 회사는 서비스의 오류 수정 및 성능 개선 등을 위하여 본 서비스를 업데이트할 수 있습니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제16조 (법인의 책임 제한)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사는 본 서비스의 완전성, 무결성, 적정성을 보증하지 않습니다.</p>
                  <p>② 회사는 본 서비스를 통해 귀하에게 제공한 추천의 정확성, 적절성을 보증하지 않습니다.</p>
                  <p>③ 회원은 기능 작동 시 각 기능의 제공사, 제공되는 기능 및 조건 등 서비스에서 안내하는 내용을 확인할 책임이 있습니다.</p>
                  <p>④ 회원은 본 서비스를 본인의 책임 하에, 본 이용약관과 관계 법령을 준수하여 적법하게 이용하여야 하고, 회사는 회원이 본 서비스를 이용하여 위법행위를 한 경우 이에 대한 책임을 지지 않습니다.</p>
                </div>
              </article>

              <article>
                <h3 className="mb-3 font-medium text-ot-text">제17조 (분쟁의 해결)</h3>
                <div className="space-y-2 text-sm leading-relaxed text-ot-gray-600">
                  <p>① 회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.</p>
                  <p>② ①항의 규정에도 불구하고 회사와 회원 사이에 소송이 제기될 경우, 소송은 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>
                </div>
              </article>
            </div>
          </section>

          {/* 부칙 */}
          <section className="rounded-2xl border border-ot-gray-800 bg-(--ot-background)/95 p-6">
            <h2 className="mb-4 text-xl font-semibold text-ot-primary-600">부칙</h2>
            <p className="text-sm text-ot-gray-600">본 약관은 2026년 3월 19일부터 적용됩니다.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
