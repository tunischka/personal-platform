"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** SerpAPI/JSON varyasyonlarını tolere eden gevşek tip */
type ReviewAny = Partial<{
  id: string;
  rating: number;
  text: string;
  date: string;
  images: string[];
  photo_url: string;
  photoUrl: string;
  image_url: string;
  photo: string;
  place: {
    title?: string;
    name?: string;
    address?: string;
    url?: string;
  };
  // eski isimler
  name: string;
  title: string;
  place_name: string;
  address: string;
  formatted_address: string;
  url: string;
  maps_url: string;
  mapsUrl: string;
}>;

type Props = {
  review?: ReviewAny;       // <ReviewCard review={r} />
  placeName?: string;       // alternatif kullanım
  district?: string;
  rating?: number;
  photoUrl?: string | null;
  address?: string;
  reviewText?: string;
  mapsUrl?: string;
  className?: string;
};

export default function ReviewCard(props: Props) {
  const [open, setOpen] = useState(false);

  // body scroll kilidi + ESC ile kapanış
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const r = props.review;

  const pick = <T,>(...vals: (T | null | undefined | "")[]) =>
    vals.find((v) => v !== undefined && v !== null && v !== "") as T | undefined;

  // --- normalize ---
  const placeName =
    pick(r?.place?.title, r?.place?.name, r?.name, r?.title, r?.place_name, props.placeName) ?? "";

  const rating = Number(pick(r?.rating, props.rating) ?? 0);

  const photoUrl =
    pick(r?.images?.[0], r?.photo_url, r?.photoUrl, r?.image_url, r?.photo, props.photoUrl) ?? null;

  const address =
    pick(r?.place?.address, r?.address, r?.formatted_address, props.address) ?? "";

  const reviewTxt = pick(r?.text, props.reviewText) ?? "";

  const mapsUrl = pick(r?.place?.url, r?.maps_url, r?.mapsUrl, r?.url, props.mapsUrl) ?? "#";

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        className={cn(
          "h-full overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-sm transition-all hover:-translate-y-[2px] hover:shadow-md",
          props.className
        )}
      >
        {/* Görsel - kart kenarlarından içe alınmış */}
        <div className="p-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100">
            {photoUrl ? (
              <Image
                src={photoUrl ?? ""} // TS için garanti
                alt={placeName}
                fill
                className="object-cover"
                sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-zinc-400">
                <span className="text-sm">Fotoğraf yok</span>
              </div>
            )}
          </div>
        </div>

        <CardContent className="flex h-full flex-col gap-3 p-4">
          {/* Başlık + Rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-zinc-800">{placeName}</h3>
              {address ? <p className="truncate text-xs text-zinc-500">{address}</p> : null}
            </div>
            <div className="shrink-0"><Stars value={rating} /></div>
          </div>

          {/* Özet */}
          {reviewTxt ? (
            <p
              className="text-[13px] leading-5 text-zinc-600"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {reviewTxt}
            </p>
          ) : null}

          <div className="mt-auto pt-1">
            <Button asChild className="w-full">
              <a href={mapsUrl} target="_blank" rel="noreferrer">Google Maps’te aç</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="mx-4 w-full max-w-3xl rounded-2xl bg-white shadow-xl outline-none transition-all
                       max-h-[85vh] overflow-y-auto"
            style={{ transform: "scale(0.98)", opacity: 0, animation: "pop .16s ease-out forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Görsel (sticky) */}
            <div className="p-3 sticky top-0 z-10 bg-white">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100">
                {photoUrl ? (
                  <Image src={photoUrl ?? ""} alt={placeName} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-zinc-400">Fotoğraf yok</div>
                )}
              </div>
            </div>

            {/* İçerik */}
            <div className="px-5 pb-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold text-zinc-800">{placeName}</h3>
                  {address ? <p className="truncate text-sm text-zinc-500">{address}</p> : null}
                </div>
                <div className="shrink-0"><Stars value={rating} /></div>
              </div>

              {reviewTxt ? (
                <p className="whitespace-pre-line text-[15px] leading-6 text-zinc-700">{reviewTxt}</p>
              ) : null}

              <div className="mt-5 flex gap-3">
                <Button asChild>
                  <a href={mapsUrl} target="_blank" rel="noreferrer">Google Maps’te aç</a>
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>Kapat</Button>
              </div>
            </div>
          </div>

          {/* pop animasyonu */}
          <style jsx>{`
            @keyframes pop { to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
    </>
  );
}

function Stars({ value = 0 }: { value?: number }) {
  const clamped = Math.max(0, Math.min(5, Math.floor(value ?? 0)));
  const full = clamped;
  const empty = 5 - clamped;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="16" height="16" viewBox="0 0 20 20" className="text-amber-500" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.126 2.272a1 1 0 00-.364 1.118l1.193 3.68c.3.923-.755 1.688-1.54 1.118l-3.152-2.284a1 1 0 00-1.176 0l-3.152 2.284c-.784.57-1.838-.195-1.539-1.118l1.193-3.68a1 1 0 00-.364-1.118L2.36 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.19-3.674z"/>
        </svg>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="16" height="16" viewBox="0 0 24 24" className="text-zinc-300" fill="currentColor" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}
