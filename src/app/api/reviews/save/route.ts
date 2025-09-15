// app/api/reviews/save/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const payload = await req.json(); // { reviews: [...], next_page_token: ... }
    const body = JSON.stringify(payload ?? { reviews: [], next_page_token: null });

    const key = process.env.REVIEWS_BLOB_KEY || "reviews/latest.json";
    const token = process.env.BLOB_READ_WRITE_TOKEN; // server only
    if (!token) return NextResponse.json({ ok: false, error: "MISSING_TOKEN" }, { status: 500 });

    const { url } = await put(key, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      token,
    });

    return NextResponse.json({ ok: true, url });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
