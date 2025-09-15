// src/components/ReviewsClient.tsx
"use client";

import { useMemo, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import type { ReviewCard as ReviewT } from "@/types/reviews";

type Props = { reviews: ReviewT[] };

function parseDate(d?: string) {
  // JSON bazen "2 hafta önce" gibi gelebilir; Date.parse başarısızsa sona at
  const t = d ? Date.parse(d) : NaN;
  return Number.isFinite(t) ? t : -Infinity;
}

export default function ReviewsClient({ reviews }: Props) {
  const [sortBy, setSortBy] = useState<"new" | "rating_desc" | "rating_asc">("new");

  const visible = useMemo(() => {
    const arr = [...reviews];
    if (sortBy === "new")      arr.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    if (sortBy === "rating_desc") arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sortBy === "rating_asc")  arr.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
    return arr;
  }, [reviews, sortBy]);

  return (
    <>
      {/* Üst bar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-400">
          Toplam <span className="font-medium text-zinc-200">{reviews.length}</span> yorum
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-zinc-400">Sırala</label>
          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 pl-3 pr-9 text-sm rounded-lg
                         border border-zinc-300/50 dark:border-white/20
                         bg-white/80 dark:bg-white/10
                         shadow-sm appearance-none
                         focus:outline-none focus:ring-2 focus:ring-blue-500/70
                         transition"
            >
              <option value="new">En yeni</option>
              <option value="rating_desc">Puan (yüksek→düşük)</option>
              <option value="rating_asc">Puan (düşük→yüksek)</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-60">▾</span>
          </div>
        </div>
      </div>

      {/* Grid — Projects sayfasındaki oranlarla paralel */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </>
  );
}
