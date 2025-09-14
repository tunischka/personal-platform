// src/app/(site)/reviews/page.tsx
//import ReviewsGrid from "@/components/ReviewsGrid";
import type { ReviewCard } from "@/types/review.tsx";

async function getInitial() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/reviews`, {
    // local dev’de boş BASE_URL ise relative fetch yapmak daha güvenli
    // ama App Router server component’ta absolute isterse aşağı fallback var:
    cache: "no-store",
  }).catch(() => null);

  if (!res || !("ok" in res) || !res.ok) {
    // fallback: runtime’da relative çağrı
    const r2 = await fetch("/api/reviews", { cache: "no-store" }).catch(() => null as any);
    if (!r2 || !r2.ok) {
      return { reviews: [] as ReviewCard[], next_page_token: null as string | null };
    }
    return r2.json();
  }
  return res.json();
}

export default async function ReviewsPage() {
  const initial = await getInitial();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Yorumlarım</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Google Maps’te paylaştığım restoran/yer yorumları. Filtrele, ara ve Google Maps’te aç.
      </p>
      <section className="p-8 text-center text-zinc-400">
  Reviews sayfası geçici olarak devre dışı.
</section>

    </main>
  );
}
