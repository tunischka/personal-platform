// /hooks/useTagFilterSort.ts
"use client";
import { useMemo, useState } from "react";
import type { TagId } from "@/content/tags";
import { extractAllTagsFromItems, filterItemsByTag, sortComparator, SortKey } from "@/lib/tags";

export function useTagFilterSort<T extends { tags: TagId[]; title?: string; date?: string }>(items: T[]) {
const [activeTag, setActiveTag] = useState<TagId | "ALL">("ALL");
const [sortBy, setSortBy] = useState<SortKey>("newest");

const allTags = useMemo(() => extractAllTagsFromItems(items), [items]);

const visible = useMemo(() => {
const filtered = filterItemsByTag(items, activeTag);
return [...filtered].sort(sortComparator(sortBy));
}, [items, activeTag, sortBy]);

return { allTags, activeTag, setActiveTag, sortBy, setSortBy, visible } as const;
}