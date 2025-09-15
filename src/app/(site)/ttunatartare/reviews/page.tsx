// app/(site)/ttunatartare/reviews/page.tsx
import ReviewCard from "@/components/ReviewCard";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/reviews`, {
    cache: "no-store",
  }).catch(() => null as any);

  if (!res || !res.ok) return { reviews: [] as any[] };
  return res.json();
}

export default async function ReviewsPage() {
  const data = await getData();
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Yorumlarım</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Google Maps katkıcı hesabımdan çekilen yorumlar.
      </p>

      {reviews.length === 0 ? (
        <p className="text-sm text-zinc-400">Henüz veri yok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r: any) => <ReviewCard key={r.id} review={r} />)}
        </div>
      )}
    </main>
  );
}
