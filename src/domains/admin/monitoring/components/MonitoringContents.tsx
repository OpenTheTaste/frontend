import { Input } from "@/components/common";
import { mockAdminUploadStatus } from "@/mocks/mockAdminUploadStatus";
import UploadStatusBadge from "./UploadStatusBadge";
import UploadProgressBar from "./UploadProgressBar";

export default function MonitoringContents() {
  const uploadstatusdata = mockAdminUploadStatus;

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-ot-gray-700">
      <div className="bg-ot-gray-700">
        {/* 표 제목 영역 : "업로드 작업" 텍스트 + Input 입력칸 묶음 */}
        <div className="flex items-center gap-4 pl-4 pr-2 py-2">
          {/* "업로드 작업" 텍스트 */}
          <span className="text-ot-text font-semibold text-[16px] whitespace-nowrap">
            업로드 작업
          </span>
          {/* Input 입력칸 */}
          <div className="flex-1">
            <Input
              placeholder="콘텐츠 제목을 입력하세요"
              className="bg-ot-gray-800 border-none text-ot-text focus:placeholder-transparent"
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-0.5 bg-ot-gray-600 w-full" />

        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-ot-gray-600">
              <th className="w-[35%] pl-8 py-4 font-semibold text-ot-text text-left">파일명</th>
              <th className="w-[12%] px-3 py-4 font-semibold text-ot-text text-left">크기</th>
              <th className="w-[12%] px-3 py-4 font-semibold text-ot-text text-left">업로더</th>
              <th className="w-[12%] px-3 py-4 font-semibold text-ot-text text-left">상태</th>
              <th className="w-[15%] pr-8 py-4 font-semibold text-ot-text text-left">진행률</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full">
        {/* overflow-y-auto no-scrollbar 스크롤바 없앨 때 옵션 붙이기 */}
        <div className="max-h-85 overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse table-auto">
            <tbody className="divide-y divide-ot-gray-800">
              {uploadstatusdata.map((item, index) => (
                <tr key={index}>
                  <td className="w-[35%] pl-8 py-4 text-ot-text truncate text-left">
                    {item.fileName}
                  </td>
                  <td className="w-[12%] px-3 py-4 text-ot-text text-left">{item.fileSize}</td>
                  <td className="w-[12%] px-3 py-4 text-ot-text text-left">{item.uploader}</td>
                  <td className="w-[12%] pr-4 py-4 text-left">
                    <UploadStatusBadge
                      status={item.status}
                      text={
                        item.status === "ORIGIN_UPLOADED"
                          ? "s3 업로드 완료"
                          : item.status === "TRANSCODING"
                            ? "트랜스코딩"
                            : item.status === "UPLOADING"
                              ? "재업로드 중"
                              : "완료"
                      }
                    />
                  </td>
                  <td className="w-[15%] pr-8 py-4 text-left">
                    <UploadProgressBar progress={item.progress} />
                  </td>
                </tr>
              ))}
              <tr className="hover:bg-ot-gray-700 transition-colors"></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
