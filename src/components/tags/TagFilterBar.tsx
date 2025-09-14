// /components/tags/TagFilterBar.tsx
"use client";
import type { TagId } from "@/content/tags";
import { TAGS, getTagIndex } from "@/content/tags";
import { colourOfIndex } from "@/content/tags";

interface Props {
available?: TagId[]; // Eğer verilmezse TAGS'ten türetir
active: TagId | "ALL";
onChange: (tag: TagId | "ALL") => void;
includeAll?: boolean; // default: true
size?: "sm" | "md"; // görsel yoğunluk
}

export default function TagFilterBar({ available, active, onChange, includeAll = true, size = "md" }: Props) {
const list = (available && available.length > 0 ? available : TAGS.map(t => t.id));
const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

return (
<div className="flex flex-wrap items-center gap-2">
{includeAll && (
<button
onClick={() => onChange("ALL")}
className={`rounded-full border ${pad} transition ${active === "ALL" ? "bg-white/10 border-white/30" : "hover:bg-white/5 border-white/20"}`}
aria-pressed={active === "ALL"}
>
All
</button>
)}
{list.map((id) => {
const idx = getTagIndex(id);
const c = colourOfIndex(idx < 0 ? 0 : idx);
const isActive = active === id;
return (
<button
key={id}
onClick={() => onChange(id)}
className={`rounded-full border ${pad} transition`}
style={{ color: c.text, backgroundColor: isActive ? c.fill : "transparent", borderColor: c.ring }}
aria-pressed={isActive}
>
{id}
</button>
);
})}
</div>
);
}