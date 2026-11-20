import { Suspense } from "react";
import { SideEditor } from "../../_components/SideEditor";
export default function GroomAdminPage() { return <Suspense fallback={<p>Đang tải thông tin…</p>}><SideEditor side="trai" /></Suspense>; }
