import { Suspense } from "react";
import { SideEditor } from "../../_components/SideEditor";
export default function BrideAdminPage() { return <Suspense fallback={<p>Đang tải thông tin…</p>}><SideEditor side="gai" /></Suspense>; }
