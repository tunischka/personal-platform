// scripts/update-reviews.ts
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fetch } from "undici";
import { put } from "@vercel/blob";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


console.log(
  "[env-check]",
  (process.env.SERPAPI_API_KEY || "").slice(0, 6),
  (process.env.GOOGLE_CONTRIBUTOR_ID || "").slice(0, 6)
);



const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY!;
const GOOGLE_CONTRIBUTOR_ID = process.env.GOOGLE_CONTRIBUTOR_ID!;
const BLOB_RW_TOKEN = process.env.BLOB_READ_WRITE_TOKEN; // Vercel -> Settings -> Tokens
const BLOB_PATH = process.env.REVIEWS_BLOB_PATH || "data/reviews.json"; 
// örn: "ttunatartare/reviews.json"

type Review = {
  id: string;
  rating?: number;
  text?: string;
  date?: string;
  images?: string[];
  place: { title?: string; address?: string; url?: string; data_id?: string; lat?: number; lng?: number };
};

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

async function fetchAll(): Promise<Review[]> {
  const base = new URLSearchParams({
    engine: "google_maps_contributor_reviews",
    contributor_id: GOOGLE_CONTRIBUTOR_ID,
    hl: "tr", gl: "tr", num: "20",
    api_key: SERPAPI_API_KEY,
  });

  const out: Review[] = [];
  let next: string | null = null;
  do {
    const params = new URLSearchParams(base);
    if (next) params.set("next_page_token", next);
    const res = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    if (!res.ok) throw new Error(`SerpAPI ${res.status}`);
    const data: any = await res.json();
    const raw = data.reviews || data.contributor_reviews || data.results || [];
    out.push(...raw.map(mapSerp));
    next = data.next_page_token || data.serpapi_pagination?.next_page_token || null;
    if (next) await new Promise(r => setTimeout(r, 800));
  } while (next);

  return out;
}

async function main() {
  const file = resolve(process.cwd(), "src/data/reviews.json");
  let local: Review[] = [];
  try { local = JSON.parse(await readFile(file, "utf8")); } catch {}

  const remote = await fetchAll();

  // id’ye göre merge
  const map = new Map<string, Review>();
  [...local, ...remote].forEach(r => map.set(r.id, r));
  const merged = Array.from(map.values());

  // 1) Lokale yaz (geliştirme kolaylığı)
  await writeFile(file, JSON.stringify(merged, null, 2), "utf8");
  console.log(`✅ reviews.json güncellendi (toplam ${merged.length})`);

  // 2) Blob’a yükle (public)
  if (!BLOB_RW_TOKEN) {
    console.warn("⚠️ BLOB_READ_WRITE_TOKEN tanımlı değil; Blob upload atlanıyor.");
    return;
  }

  const { url } = await put(BLOB_PATH, JSON.stringify({ reviews: merged, next_page_token: null }), {
    access: "public",
    contentType: "application/json",
    token: BLOB_RW_TOKEN,
    addRandomSuffix: false // path sabit kalsın
  });

  console.log("✅ Blob yüklendi:", url);
  console.log("ℹ️  REVIEWS_JSON_URL olarak bu public URL’i kullanın.");
}

main().catch(e => { console.error("❌ Hata:", e); process.exit(1); });
