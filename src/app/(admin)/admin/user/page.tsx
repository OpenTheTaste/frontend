import { AdminSearch } from "@admin";
import AdminUserContents from "@/domains/admin/user/components/AdminUserContents";

export default function UserPage() {
  return (
    <>
      <AdminSearch
        placeholder="이름 또는 이메일을 검색하세요."
      />
      <AdminUserContents/>
    </>
  );
}
