// /lib/tags/index.ts
import type { TagId } from "@/content/tags.ts";

export type ItemWithTags = { tags: TagId[] } & Record<string, unknown>;

export function extractAllTagsFromItems<T extends ItemWithTags>(items: T[]): TagId[] {
const s = new Set<TagId>();
items.forEach(it => it.tags?.forEach(t => s.add(t)));
return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export function filterItemsByTag<T extends ItemWithTags>(items: T[], tag: TagId | "ALL") {
if (tag === "ALL") return items;
return items.filter(it => it.tags?.includes(tag));
}

export type SortKey = "newest" | "oldest" | "az" | "za";

export function sortComparator<T extends { title?: string; date?: string }>(key: SortKey) {
return (a: T, b: T) => {
switch (key) {
case "newest":
return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
case "oldest":
return new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime();
case "az":
return (a.title ?? "").localeCompare(b.title ?? "");
case "za":
return (b.title ?? "").localeCompare(a.title ?? "");
}
};
}