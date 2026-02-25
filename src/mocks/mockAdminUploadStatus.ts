export type UploadStatus =
  | "ORIGIN_UPLOADED" // s3 업로드 완료
  | "TRANSCODING" // 트랜스코딩 중
  | "UPLOADING" // 트랜스코딩된 파일 S3 업로드 중
  | "COMPLETED"; // 전체 완료

export interface UploadTask {
  id: number;
  fileName: string;
  fileSize: string;
  uploader: string;
  status: UploadStatus;
  progress: number;
}

export const mockAdminUploadStatus: UploadTask[] = [
  {
    id: 1,
    fileName: "파묘_Final_Main.mp4",
    fileSize: "12.5GB",
    uploader: "editor_kim",
    status: "TRANSCODING",
    progress: 45,
  },
  {
    id: 2,
    fileName: "서울의봄_고화질_export.mov",
    fileSize: "18.2GB",
    uploader: "admin_lee",
    status: "COMPLETED",
    progress: 100,
  },
  {
    id: 3,
    fileName: "범죄도시4_Trailer.mp4",
    fileSize: "5.4GB",
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 82,
  },
  {
    id: 4,
    fileName: "인사이드아웃2_KR_Sub.mkv",
    fileSize: "3.1GB",
    uploader: "editor_kim",
    status: "ORIGIN_UPLOADED",
    progress: 0, // 이제 막 원본이 올라와서 트랜스코딩 대기 중인 상태
  },
  {
    id: 5,
    fileName: "데드풀과울버린_Teaser.mp4",
    fileSize: "1.2GB",
    uploader: "admin_lee",
    status: "TRANSCODING",
    progress: 15, // 트랜스코딩 시작 단계
  },
  {
    id: 6,
    fileName: "듄_파트2_Main_4K.mov",
    fileSize: "25.7GB",
    uploader: "editor_park",
    status: "UPLOADING",
    progress: 30, // 트랜스코딩 후 S3 재업로드 초반 단계
  },
  {
    id: 7,
    fileName: "에이리언_로물루스_Clip.mp4",
    fileSize: "850MB",
    uploader: "editor_kim",
    status: "COMPLETED",
    progress: 100,
  },
];
