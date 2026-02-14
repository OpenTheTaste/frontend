import FAQItem from './FAQItem';

const faqs = [
  {
    question: 'O+T에 어떻게 가입할 수 있나요?',
    answer: 'O+T는 SNS연동 계정으로 쉽게 시작할 수 있습니다.\n1. O+T WEB 접속\n2. [O+T 시작하기] 버튼 클릭\n3. 원하는 회원가입 시작하기'
  },
  {
    question: '추천 시스템은 기본 OT와 어떻게 다르나요?',
    answer: '기본 설명 텍스트...'
  }
];

export default function FAQSection() {
  return (
    <section className="w-full bg-background">
      <div className="px-6 py-12 max-w-2xl mx-auto">
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