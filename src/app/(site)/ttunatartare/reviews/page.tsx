// app/(site)/ttunatartare/reviews/page.tsx
import ReviewCard from "@/components/ReviewCard";
import { headers } from "next/headers";

// (isteğe bağlı) basit SEO
export const metadata = {
  title: "Yorumlarım – Tuna Tartar",
  description: "Google Maps katkıcı hesabımdan çekilen yorumlar.",
};

async function getData() {
  // prod'da host üzerinden mutlak URL kur
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") || "https";
  const base = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : "");
  const url = `${base}/api/reviews`;

  const res = await fetch(url, { cache: "no-store" }).catch(() => null as any);
  if (!res || !res.ok) return { reviews: [] as any[] };
  return res.json();
}

export default async function ReviewsPage() {
  const data = await getData();
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold">Yorumlarım</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Google Maps katkıcı hesabımdan çekilen yorumlar.
      </p>

      {reviews.length === 0 ? (
        <p className="text-sm text-zinc-400">Henüz veri yok.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((r: any) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </main>
  );
}
