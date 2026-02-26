import FAQItem from './FAQItem';

const faqs = [
  {
    question: 'O+T에 어떻게 가입할 수 있나요?',
    answer: 'O+T는 SNS연동 계정으로 쉽게 시작할 수 있습니다.\n1. O+T WEB 접속\n2. [O+T 시작하기] 버튼 클릭\n3. 원하는 회원가입 시작하기\n위와 같은 방식으로 로그인이 지속해서 되지 않는 경우 문의하기를 진행해주시면, \n신속하게 가입하신 계정 확인하여 답변드리겠습니다.'
  },
  {
    question: '기존의 추천시스템과 O+T의 추천시스템은 어떻게 다르나요?',
    answer: '기존 추천 시스템과 유사한 기본 로직을 사용하지만, O+T는 ‘커스텀 페이지’를 통해 사용자가 직접 추천 기준을 설정할 수 있다는 점에서 차별화됩니다. \n또한 마이페이지에서 추천 로직이 반영된 결과를 그래프로 시각화하여 제공함으로써, 추천 과정에 대한 이해를 돕고 사용자 신뢰도를 높이고 있습니다.'
  }
];

export default function FAQSection() {
  return (
    <section className="w-full bg-ot-background">
      <div className="px-6 py-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">자주 묻는 질문</h2>
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}