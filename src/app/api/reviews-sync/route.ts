import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

type Review = {
  id: string;
  rating?: number;
  text?: string;
  date?: string;
  images?: string[];
  place: { title?: string; address?: string; url?: string; data_id?: string; lat?: number; lng?: number };
};

const SERP = "https://serpapi.com/search.json";
const apiKey = process.env.SERPAPI_API_KEY!;
const contrib = process.env.GOOGLE_CONTRIBUTOR_ID!;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN!;
const blobKeyRaw = process.env.BLOB_REVIEWS_KEY || "reviews.json";
const blobKey = encodeURIComponent(blobKeyRaw);

// Serp → Review map
function toArr<T = any>(v: any): T[] { return Array.isArray(v) ? v : (v ? [v] : []); }
function mapSerp(r: any): Review {
  const place = r.place_info || r.place || {};
  const imgs = toArr(r.images).map((i: any) => i?.image || i?.thumbnail || i).filter(Boolean);
  const url = r.link || place.link || place.google_maps_url || (r.data_id ? `https://www.google.com/maps?cid=${r.data_id}` : undefined);
  const id = String(r.review_id || r.id || r.data_id || url || Math.random());
  return {
    id,
    rating: Number(r.rating) || 0,
    text: r.snippet || r.review_text || "",
    date: r.published_on || r.date || r.time_ago,
    images: imgs.length ? imgs : undefined,
    place: {
      title: place.title || place.name,
      address: place.address || r.address,
      url,
      data_id: r.data_id || place.data_id,
      lat: place.gps_coordinates?.latitude ?? place.lat,
      lng: place.gps_coordinates?.longitude ?? place.lng,
    }
  };
}

async function fetchPage(params: URLSearchParams) {
  const res = await fetch(`${SERP}?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`SerpAPI ${res.status}`);
  const data: any = await res.json();
  const raw = data.reviews || data.contributor_reviews || data.results || [];
  const next = data.next_page_token || data.serpapi_pagination?.next_page_token || null;
  return { reviews: raw.map(mapSerp), next };
}

export async function GET() {
  if (!apiKey || !contrib || !blobToken) {
    return NextResponse.json({ error: "Missing envs" }, { status: 500 });
  }

  // 1) EXISTING: blob’dan oku (varsa)
  let existing: Review[] = [];
  try {
    await head(`blob://${blobKeyRaw}`, { token: blobToken });
    const res = await fetch(`https://blob.vercel-storage.com/${blobKey}`, {
      // private olursa:
      // headers: { Authorization: `Bearer ${blobToken}` },
      cache: "no-store",
    });
    if (res.ok) existing = await res.json();
  } catch { /* yoksa boş */ }

  // 2) SerpAPI – minimum istek mantığı
  const base = new URLSearchParams({
    engine: "google_maps_contributor_reviews",
    contributor_id: contrib,
    hl: "tr",
    gl: "tr",
    num: "20",
    api_key: apiKey,
  });

  const collected: Review[] = [];
  if (!existing.length) {
    // İlk kez: full paginate
    let next: string | null = null;
    do {
      const params = new URLSearchParams(base);
      if (next) params.set("next_page_token", next);
      const { reviews, next: nxt } = await fetchPage(params);
      collected.push(...reviews);
      next = nxt;
      if (next) await new Promise(r => setTimeout(r, 800));
    } while (next);
  } else {
    // Sonraki çalıştırmalarda: sadece ilk sayfa (tek istek)
    const { reviews } = await fetchPage(new URLSearchParams(base));
    collected.push(...reviews);
  }

  // 3) merge + dedup
  const map = new Map<string, Review>();
  [...existing, ...collected].forEach(r => map.set(r.id, r));
  const merged = Array.from(map.values());

  // 4) yaz (public)
  const { url } = await put(blobKeyRaw, JSON.stringify(merged, null, 2), {
    access: "public",                // istersen "private" yap
    contentType: "application/json",
    token: blobToken,
  });

  return NextResponse.json({ saved_url: url, added: collected.length, total: merged.length });
}
