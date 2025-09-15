// app/(site)/reviews/page.tsx
import type { ReviewCard } from "@/types/reviews";

async function getInitial() {
  const res = await fetch("/api/reviews", { cache: "no-store" }).catch(() => null as any);
  if (!res || !res.ok) return { reviews: [] as ReviewCard[], next_page_token: null as string | null };
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

      {!initial?.reviews?.length ? (
        <section className="p-8 text-center text-zinc-400">Reviews sayfası geçici olarak devre dışı.</section>
      ) : (
        // burada gridini render edersin
        <div>{/* <ReviewsGrid items={initial.reviews}/> */}</div>
      )}
    </main>
  );
}
