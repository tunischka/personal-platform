import type { TagId } from "@/content/tags";

export type Project = {
    href?: string;
    title: string;
    text: string;
    imgSrc?: string;
    imgAlt?: string;
    date: string; // ISO date
    tags: TagId[];
};

export const projects: Project[] = [
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
