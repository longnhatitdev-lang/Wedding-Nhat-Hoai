import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { weddingAlbumFiles } from "@/lib/db/schema/wedding";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 });
  const [file] = await db.select().from(weddingAlbumFiles).where(eq(weddingAlbumFiles.id, id)).limit(1);
  if (!file) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(Buffer.from(file.data, "base64")), { headers: { "Content-Type": file.mimeType, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
}
