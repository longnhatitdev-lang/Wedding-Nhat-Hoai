import { Suspense } from "react";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/session";
import { getSideSettings, type Side } from "@/lib/admin/settings";
import { WeddingPage } from "@/components/layout/WeddingPage";

async function Preview({ params }: { params: Promise<{ side: string }> }) {
  await requireAdmin();
  const { side } = await params;
  if (side !== "trai" && side !== "gai") notFound();
  const settings = await getSideSettings(side as Side);
  return <WeddingPage preview={{ side, settings }} />;
}

export default function PreviewPage({ params }: { params: Promise<{ side: string }> }) {
  return <Suspense fallback={<p>Đang tải thiệp…</p>}><Preview params={params} /></Suspense>;
}
