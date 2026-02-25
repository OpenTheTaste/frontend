import AdminContentsSection from "@/domains/admin/contents/components/AdminContentsSection"; // FIXME:
import { Suspense } from "react";

export default function AdminContentsPage() {
  return (
    <Suspense fallback={null}>
      {" "}
      {/*Pre-rendering 지금은 아무것도 없음*/}
      <AdminContentsSection />
    </Suspense>
  );
}
