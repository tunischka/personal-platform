export default function ReviewCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-4">
      <div className="mb-3 h-40 w-full rounded-xl bg-zinc-800/60" />
      <div className="mb-2 h-4 w-2/3 rounded bg-zinc-800/60" />
      <div className="mb-2 h-3 w-1/2 rounded bg-zinc-800/60" />
      <div className="h-16 w-full rounded bg-zinc-800/60" />
    </div>
  );
}
