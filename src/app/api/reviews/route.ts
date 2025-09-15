// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const revalidate = 0;

export async function GET() {
  // 1) Blob (public) URL varsa onu dene
  const blobUrl = process.env.REVIEWS_JSON_URL;

  if (blobUrl) {
    try {
      const r = await fetch(blobUrl, { cache: "no-store" });
      if (r.ok) {
        const data = await r.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch {}
  }

  // 2) Fallback: repodaki lokal dosyayı oku (dev için)
  try {
    const file = resolve(process.cwd(), "src/data/reviews.json");
    const raw = await readFile(file, "utf8");
    const reviews = JSON.parse(raw);
    // Eğer reviews.json saf array ise normalize et
    const payload = Array.isArray(reviews)
      ? { reviews, next_page_token: null }
      : reviews;

    return NextResponse.json(payload, { status: 200 });
  } catch {}

  // 3) Son çare: boş
  return NextResponse.json({ reviews: [], next_page_token: null }, { status: 200 });
}

