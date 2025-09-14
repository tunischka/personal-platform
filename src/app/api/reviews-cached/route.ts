import { NextResponse } from "next/server";
import { head } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN!;
const key = encodeURIComponent(process.env.BLOB_REVIEWS_KEY || "reviews.json");

// (opsiyonel) 5 dk CDN cache
export const revalidate = 300;

export async function GET() {
  try {
    // blob’da var mı?
    await head(`blob://${decodeURIComponent(key)}`, { token });

    // public okuma: doğrudan fetch
    const res = await fetch(`https://blob.vercel-storage.com/${key}`, {
      // Eğer dosyayı private yazacaksan, aşağıyı aç:
      // headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ reviews: [], next_page_token: null, source: "fetch-failed" }, { status: 502 });
    }

    const data: any = await res.json();
    return NextResponse.json(
      { reviews: data ?? [], next_page_token: null, source: "blob" },
      { headers: { "Cache-Control": "s-maxage=300" } }
    );
  } catch {
    // henüz yazılmadıysa boş dön
    return NextResponse.json({ reviews: [], next_page_token: null, source: "empty" });
  }
}
