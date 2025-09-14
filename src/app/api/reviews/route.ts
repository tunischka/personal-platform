// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import type { ReviewCard } from "@/types/review";


function coerceArray<T = any>(val: any): T[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

// SerpAPI review → ReviewCard
function mapSerpReview(r: any): ReviewCard {
  const place = r.place_info || r.place || {};
  const imagesArr = coerceArray(r.images).map((img: any) => img?.image || img?.thumbnail || img).filter(Boolean);

  // basit id türetici
  const tryId =
    r.review_id ||
    r.id ||
    r.link?.split("=cid=")[1] ||
    r.data_id ||
    (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

  const link =
    r.link ||
    place.link ||
    place.google_maps_url ||
    (r.data_id ? `https://www.google.com/maps?cid=${r.data_id}` : undefined);

  return {
    id: String(tryId),
    rating: Number(r.rating) || 0,
    text: r.snippet || r.review_text || "",
    date: r.published_on || r.date || r.time_ago,
    images: imagesArr.length ? imagesArr : undefined,
    place: {
      title: place.title || place.name || r.source?.name || "Unknown",
      address: place.address || r.address,
      url: link,
      data_id: r.data_id || place.data_id,
      lat: place.gps_coordinates?.latitude ?? place.lat,
      lng: place.gps_coordinates?.longitude ?? place.lng,
    },
  };
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY;
  const contrib = process.env.GOOGLE_CONTRIBUTOR_ID;
  if (!apiKey || !contrib) {
    return NextResponse.json({ error: "Missing SERPAPI_API_KEY or GOOGLE_CONTRIBUTOR_ID" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const pageToken = searchParams.get("page_token") || "";
  const refresh = searchParams.get("refresh") === "1";

  const qs = new URLSearchParams({
    engine: "google_maps_contributor_reviews",
    contributor_id: contrib,
    hl: "tr",
    gl: "tr",
    num: "20",
    api_key: apiKey,
  });
  if (pageToken) qs.set("next_page_token", pageToken);

  const serpUrl = `https://serpapi.com/search.json?${qs.toString()}`;

  const res = await fetch(serpUrl, {
    // refresh=1 gelirse cache’i bypass et
    cache: refresh ? "no-store" : "force-cache",
    next: { revalidate },
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    return NextResponse.json({ error: `SerpAPI error: ${res.status}`, detail: msg }, { status: 502 });
  }

  const data = await res.json();

  const raw =
    data.reviews ||
    data.contributor_reviews ||
    data.results ||
    []; // endpoint’e göre alan adı değişebiliyor

  const reviews: ReviewCard[] = raw.map(mapSerpReview);

  return NextResponse.json(
    {
      reviews,
      total: data.search_information?.total_results ?? reviews.length,
      next_page_token: data.next_page_token || data.serpapi_pagination?.next_page_token || null,
      fetched_at: new Date().toISOString(),
    },
    {
      headers: {
        // edge/CDN tarafında da 24h cache
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=600",
      },
    }
  );
}
