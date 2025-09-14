import Link from "next/link";
import { Mail, Github, Linkedin, Download } from "lucide-react";

export default function CVPage() {
const cvHref = "/cv/cv-latest.pdf"; // single canonical path

return (
<main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
{/* Header Card */}
<section className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur rounded-3xl shadow-sm ring-1 ring-black/5 p-6 sm:p-8">
<div className="flex flex-col gap-6 sm:flex-row sm:items-center">
{/* Avatar */}
<div className="shrink-0">
<img
src="images/avatar.jpeg"
alt="Tunahan Gökgöz"
className="h-28 w-28 rounded-full object-cover ring-1 ring-black/10"
/>
</div>

{/* Name + subtitle + actions */}
<div className="flex-1 min-w-0">
<h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Tunahan Gökgöz</h1>
<p className="mt-2 text-neutral-600 dark:text-neutral-400">Cybersecurity Enthusiast •{" "}
  <a
    href="https://instagram.com/ttuna.tartare"
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-dotted hover:text-pink-600"
  >
  tuna.tartare 🍣</a></p>

<div className="mt-4 flex flex-wrap gap-3">
<Action href="https://www.linkedin.com/in/tuna-gökgöz/" styleType="brand">
<span className="inline-flex items-center gap-2">
<span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white/10">
<span className="font-bold text-white text-xs">in</span>
</span>
LinkedIn
</span>
</Action>

<Action href="https://github.com/tunischka" styleType="dark">
<span className="inline-flex items-center gap-2">
<Github className="h-4 w-4" />
GitHub
</span>
</Action>

<Action href="mailto:tunagokgoz19@gmail.com" styleType="light">
<span className="inline-flex items-center gap-2">
<Mail className="h-4 w-4" />
Email Me
</span>
</Action>
</div>
</div>
</div>

{/* Profile text */}
<div className="mt-8">
<h2 className="text-xl font-semibold">Profile</h2>
<p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
MIS student focused on web application security and practical pentesting. I publish
concise CTF walkthroughs and build small labs to strengthen fundamentals (web-exploitation,
privilege escalation, network forensics).
</p>
</div>
</section>

{/* Embedded CV + Download */}
<section className="mt-8">
<div className="mb-4 flex items-center justify-between gap-3">
<h2 className="text-lg font-semibold">Curriculum Vitae</h2>
<Link
href={cvHref}
target="_blank"
className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
>
<Download className="h-4 w-4" />
<span>Download PDF</span>
</Link>
</div>

<div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
<iframe src={`${cvHref}#view=FitH`} className="h-[70vh] w-full" title="Embedded CV" />
</div>
</section>
</main>
);
}

// ---- UI helper
function Action({ href, styleType, children }: { href: string; styleType?: "brand" | "dark" | "light"; children: React.ReactNode }) {
const base = "rounded-xl px-4 py-2 text-sm font-medium inline-flex items-center justify-center border transition";
const styles =
styleType === "brand"
? "bg-[#0A66C2] text-white border-[#0A66C2] hover:opacity-90"
: styleType === "dark"
? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800"
: "bg-white/60 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800";

return (
<Link href={href} target={href.startsWith("http") ? "_blank" : undefined} className={`${base} ${styles}`}>
{children}
</Link>
);
}
