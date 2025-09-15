// app/(site)/ttunatartare/page.tsx
import Link from "next/link";

export default function TunaTartarLanding() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-3 text-3xl font-bold">Tuna Tartar</h1>
      <p className="mb-8 text-zinc-500">Ekosistem ana sayfası. Aşağıdan bölümlere geçebilirsin.</p>

      <div className="flex gap-3">
        <Link
          href="/ttunatartare/reviews"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
          Reviews
        </Link>
        {/* İleride blog açınca */}
        {/* <Link href="/ttunatartare/blog" className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">Blog</Link> */}
      </div>
    </main>
  );
}
