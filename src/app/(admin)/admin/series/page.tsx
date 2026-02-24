import { AdminSearch } from "@/components/admin/common";
import { AdminSeriesContents } from "@adminseries";

export default function UserPage() {
    return (
        <>
            <AdminSearch
                placeholder="시리즈 제목을 입력해주세요."
            />
            <AdminSeriesContents/>
        </>
    )

}
