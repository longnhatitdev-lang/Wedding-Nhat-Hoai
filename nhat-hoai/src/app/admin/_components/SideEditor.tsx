import type { Side } from "@/lib/admin/settings";

export async function SideEditor({ side }: { side: Side }) {
  const label = side === "trai" ? "Nhà trai" : "Nhà gái";
  return <>
    <h1 className="my-3 font-[Georgia,serif] text-[clamp(30px,4vw,46px)] font-normal text-[#341820]">Thiệp {label.toLowerCase()}</h1>
    <p className="mb-5 leading-relaxed text-[#846c70]">Nhấn vào phần chữ trên thiệp để chỉnh sửa, sau đó nhấn Lưu thay đổi.</p>
    <iframe title={`Chỉnh sửa thiệp ${label.toLowerCase()}`} src={`/admin-preview/${side}`} className="h-[80vh] min-h-[600px] w-full rounded-xl border border-[#eadfd8] bg-[#a90404]" />
  </>;
}
