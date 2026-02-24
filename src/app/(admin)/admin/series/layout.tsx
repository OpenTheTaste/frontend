import UploadButton from "@/domains/admin/contents/components/UploadButton";
import { AdminTitle } from "@admin-basecomponent";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="시리즈 관리"
        description="콘텐츠 시리즈를 관리합니다"
        action = {<UploadButton label="시리즈 업로드"/>}
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
