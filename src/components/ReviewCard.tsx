// src/components/ReviewCard.tsx
"use client";

import { Star } from "lucide-react";
import type { ReviewCard as ReviewCardT } from "@/types/reviews";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

type Props = { review: ReviewCardT };

export default function ReviewCard({ review }: Props) {
  const { place, rating, text, date, images, id } = review;

  const stars = useMemo(() => {
    const full = Math.round(Number(rating) || 0);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="h-4 w-4"
        aria-hidden
        strokeWidth={1.5}
        fill={i < full ? "currentColor" : "none"}
      />
    ));
  }, [rating]);

  return (
    <Card key={id} className="overflow-hidden rounded-2xl border-zinc-800/50 bg-zinc-900/40">
      {/* Kapak */}
      {images?.length ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={images[0]}
          alt={place.title ?? "Place image"}
          className="aspect-[3/2] w-full object-cover"
        />
      ) : null}

      <CardContent className="p-4">
        {/* Başlık + Puan */}
        <header className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug">
            {place.title ?? "Bilinmeyen Mekan"}
          </h3>
          <div className="flex items-center gap-1 text-amber-400">{stars}</div>
        </header>

        {/* Adres / Tarih */}
        <div className="mb-2 text-xs text-zinc-400">
          {place.address ? <span>{place.address}</span> : null}
          {place.address && date ? <span> • </span> : null}
          {date ? <time>{date}</time> : null}
        </div>

        {/* Yorum metni */}
        {text ? (
          <p className="mb-3 line-clamp-4 text-sm text-zinc-200/90">{text}</p>
        ) : (
          <p className="mb-3 text-sm italic text-zinc-400">Metin yok</p>
        )}

        {/* Buton */}
        {place.url ? (
          <a
            href={place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
          >
            Google Maps’te aç
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
