// /content/tags.ts
export type TagId =
| "forensics"
| "malware"
| "ctf"
| "web-exploitation"
| "priv-escalation"
| "windows-exploitation";

export interface TagDef {
id: TagId;
label: string;
}

export const TAGS: TagDef[] = [
{ id: "forensics", label: "Forensics" },
{ id: "malware", label: "Malware" },
{ id: "ctf", label: "CTF" },
{ id: "web-exploitation", label: "Web-Exploitation" },
{ id: "priv-escalation", label: "Privilege-Escalation" },
{ id: "windows-exploitation", label: "Windows-Exploitation" },
];

// Golden Angle renk dağıtımı
export const GOLDEN_ANGLE = 137.508; // derece cinsinden

export function colourOfIndex(index: number) {
const hue = (index * GOLDEN_ANGLE) % 360;
return {
text: `hsl(${hue} 60% 35%)`,
fill: `hsla(${hue} 70% 45% / 0.18)`,
ring: `hsla(${hue} 70% 45% / 0.35)`,
} as const;
}

export const TAG_MAP: Record<TagId, TagDef> = TAGS.reduce((acc, t) => {
acc[t.id] = t;
return acc;
}, {} as Record<TagId, TagDef>);

export function getTagIndex(id: TagId) {
return TAGS.findIndex(t => t.id === id);
}

export function getTagLabel(id: TagId) {
return TAG_MAP[id]?.label ?? id;
}