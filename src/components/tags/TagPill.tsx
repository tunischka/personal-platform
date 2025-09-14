// /components/tags/TagPill.tsx
"use client";
import { TAGS, getTagIndex, getTagLabel } from "@/content/tags";
import type { TagId } from "@/content/tags";
import { colourOfIndex } from "@/content/tags";

export interface TagPillProps {
id: TagId;
className?: string;
}

export default function TagPill({ id, className = "" }: TagPillProps) {
const idx = getTagIndex(id);
const c = colourOfIndex(idx < 0 ? 0 : idx);
const label = getTagLabel(id);
return (
<span
className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border ${className}`}
style={{ color: c.text, backgroundColor: c.fill, borderColor: c.ring }}
title={label}
aria-label={`Tag: ${label}`}
>
{label}
</span>
);
}