// src/app/(site)/projects/ProjectsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import TagPill from "@/components/tags/TagPill";
import TagFilterBar from "@/components/tags/TagFilterBar";
import { useTagFilterSort } from "@/hooks/useTagFilterSort";
import type { TagId } from "@/content/tags";

// 1) Net tip
type Project = {
  href?: string;
  title: string;
  text: string;
  imgSrc?: string;
  imgAlt?: string;
  date: string;     // ISO date
  tags: TagId[];
};

// 2) Proje verileri
const projects: Project[] = [
  {
    href: "/projects/angler-exploit-kit",
    title: "Angler Exploit Kit — PCAP Network Forensics Case Study",
    text: "PCAP forensics on a multi-stage Angler EK attack chain.",
    imgSrc: "/images/angler-cover.jpg",
    imgAlt: "Angler EK",
    date: "2024-08-18",
    tags: ["forensics", "malware"],
  },
  {
    href: "/projects/vulnversity",
    title: "Vulnversity – TryHackMe CTF Walkthrough",
    text: "This write-up covers my walkthrough of the Vulnversity CTF room on TryHackMe, aimed at building foundational skills in web exploitation.",
    imgSrc: "/images/vulnversity-cover.jpeg",
    imgAlt: "Vulnversity",
    date: "2024-10-03",
    tags: ["ctf", "web-exploitation"],
  },
  {
    href: "/projects/wonderland",
    title: "Wonderland – TryHackMe CTF Walkthrough",
    text: "This write-up covers my walkthrough of the Wonderland CTF room on TryHackMe, aimed at building foundational skills in privilege escalation.",
    imgSrc: "/images/wonderland_cover.jpeg",
    imgAlt: "Wonderland",
    date: "2024-11-12",
    tags: ["ctf", "priv-escalation"],
  },
  {
    href: "/projects/blue",
    title: "Blue – TryHackMe CTF Walkthrough",
    text: "This write-up covers my walkthrough of the Wonderland CTF room on TryHackMe, aimed at building foundational skills in privilege escalation.",
    imgSrc: "/images/blue_cover.jpeg",
    imgAlt: " Blue",
    date: "2025-12-08",
    tags: ["ctf", "windows-exploitation"],
  },
];

// 3) Kart
function ProjectSlot({ href, title, text, imgSrc, imgAlt, tags }: Project) {
  const Inner = (
    <div className="flex items-center gap-6">
      <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">
        {imgSrc ? (
          <Image src={imgSrc} alt={imgAlt || title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm text-gray-400">(image)</div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{text}</p>
        {!!tags?.length && (
          <div className="flex flex-wrap gap-1">
            {tags.map((id) => <TagPill key={id} id={id} />)}
          </div>
        )}
      </div>
    </div>
  );

  const baseClasses =
    "rounded-3xl border border-gray-200/80 bg-white/70 dark:bg-white/5 shadow-sm p-6 transition";

  return href ? (
    <Link href={href} className={`block hover:shadow-md ${baseClasses}`}>
      {Inner}
    </Link>
  ) : (
    <div className={baseClasses}>{Inner}</div>
  );
}

// 4) Liste + filtre/sort
export default function ProjectsClient() {
  const { allTags, activeTag, setActiveTag, sortBy, setSortBy, visible } =
    useTagFilterSort(projects);

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TagFilterBar
          available={allTags}
          active={activeTag}
          onChange={setActiveTag}
        />

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-gray-700 dark:text-gray-300">
            Sort
          </label>

          {/* SELECT — sadece görünüşü güzelleştirilmiş */}
          <div className="relative">
            <select
              id="sort"
              className="
                h-9 pl-3 pr-9 text-sm
                rounded-lg
                border border-gray-300 dark:border-white/20
                bg-white/90 dark:bg-white/10
                shadow-sm
                appearance-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                transition
              "
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>

            {/* aşağı ok ikonu */}
            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-70"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.4a.75.75 0 0 1-1.08 0l-4.25-4.4a.75.75 0 0 1 .02-1.06z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {visible.map((p) => (
          <ProjectSlot key={p.title} {...p} />
        ))}
      </div>
    </>
  );
}
