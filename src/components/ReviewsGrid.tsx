"use client";

import type { ReviewCard as ReviewCardT } from "@/types/review";
import ReviewCard from "./ReviewCard";
import { useEffect, useMemo, useState } from "react";

type Props = {
  initial: {
    reviews: ReviewCardT[];
    next_page_token?: string | null;
  };
};

export default function ReviewsGrid({ initial }: Props) {
  const [reviews, setReviews] = useState<ReviewCardT[]>(initial.reviews || []);
  const [nextToken, setNextToken] = useState<string | null>(
    (initial.next_page_token as string) ?? null
  );
  const [q, setQ] = useState("");
  const [minRating, setMinRating] = useState<number>(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return reviews.filter((r) => {
      const okRating = (r.rating || 0) >= (minRating || 0);
      if (!needle) return okRating;
      const hay = `${r.place.title ?? ""} ${r.text ?? ""} ${r.place.address ?? ""}`.toLowerCase();
      return okRating && hay.includes(needle);
    });
  }, [reviews, q, minRating]);

  async function loadMore() {
    if (!nextToken) return;
    const res = await fetch(`/api/reviews?page_token=${encodeURIComponent(nextToken)}`, {
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = await res.json();
    setReviews((cur) => [...cur, ...(data.reviews || [])]);
    setNextToken(data.next_page_token || null);
  }

  useEffect(() => {
    if (!reviews.length) {
      fetch("/api/reviews", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => {
          setReviews(d.reviews || []);
          setNextToken(d.next_page_token || null);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="space-y-4">
      {/* Kontroller */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Mekan adı, adres veya yorumda ara…"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-500 md:max-w-md"
          />
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="minRating" className="text-zinc-400">
              Min. Puan
            </label>
            <select
              id="minRating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-2 py-2 text-sm outline-none"
            >
              <option value={0}>Hepsi</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQ("");
              setMinRating(0);
            }}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800"
          >
            Sıfırla
          </button>
          {nextToken ? (
            <button
              onClick={loadMore}
              className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
            >
              Daha fazla yükle
            </button>
          ) : (
            <span className="text-xs text-zinc-500">Tüm kayıtlar yüklendi</span>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 text-center text-sm text-zinc-400">
          Sonuç yok. Filtreleri gevşetmeyi deneyebilirsin.
        </div>
      )}
    </section>
  );
}
