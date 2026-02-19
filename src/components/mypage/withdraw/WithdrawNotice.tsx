export default function WithdrawNotice() {
  return (
    <div className="flex flex-col items-center text-center mt-2 mb-7.5">
      <h1 className="text-ot-text text-[36px] font-bold mb-3.25">정말 탈퇴하시겠습니까?</h1>

      <p className="text-ot-text text-[14px] font-semibold">
        탈퇴 시 고객님의 북마크 목록, 시청 내역, 통계 등 모든 데이터가 즉시 삭제되며 복구할 수
        없습니다.
      </p>
    </div>
  );
}
