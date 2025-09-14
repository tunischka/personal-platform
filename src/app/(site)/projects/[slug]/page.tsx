import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import PDF from "@/components/PDF"; 


export const runtime = "nodejs";

const ROOT = path.join(process.cwd(), "src", "content", "projects");

export default async function ProjectPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;                   // ✅ Next 15 için gerekli
  const file = path.join(ROOT, `${slug}.mdx`);
  if (!fs.existsSync(file)) return notFound();

  const src = fs.readFileSync(file, "utf8");
  const { content, data } = matter(src);

const mdx = await MDXRemote({
  source: content,
  options: {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  },components: { PDF },
});


  return (
    <article className="mx-auto max-w-3xl px-4 py-10 rounded-3xl bg-white/70 dark:bg-white/[0.04] shadow-sm
                        prose prose-slate dark:prose-invert prose-a:underline">
      <h1>{(data as any).title ?? slug}</h1>
      {mdx}
      <style>{`
        article object{ width:100%; height:70vh; border-radius:.75rem; border:1px solid rgba(0,0,0,.08);}
        @media (max-width:640px){ article object{ height:60vh; } }
      `}</style>
    </article>
  );
}
