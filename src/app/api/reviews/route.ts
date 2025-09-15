// app/api/reviews/route.ts
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const url = process.env.REVIEWS_JSON_URL; // public blob url
    if (!url) {
      // env yoksa boş dön (deploy kırma)
      return NextResponse.json({ reviews: [], next_page_token: null }, { status: 200 });
    }

    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ reviews: [], next_page_token: null }, { status: 200 });

    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ reviews: [], next_page_token: null }, { status: 200 });
  }
}
