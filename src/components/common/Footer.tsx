const Footer = () => {
  return (
    <footer className="w-full max-w-480 h-30 flex items-center justify-center border-t border-ot-gray-700 bg-background">
      {/* 푸터 이용약관 목록 */}
      <div className="flex items-center justify-between w-[13.438rem] h-3 text-[0.75rem] text-ot-gray-600">
        <button className="hover:underline cursor-pointer">문의하기</button>
        <button className="hover:underline cursor-pointer">이용약관</button>
        <button className="hover:underline cursor-pointer">개인정보처리방침</button>
      </div>
    </footer>
  );
};

export default Footer;
