import "@/app/globals.css";
import { siteConfig } from "@/lib/config/site";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import GlassNav from "@/components/navbar/GlassNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen inter`}>
      <GlassNav />

      {/* ⬇️ nav yüksekliği + küçük boşluk kadar padding */}
      <main className="pt-[calc(var(--nav-h,72px)+var(--nav-gap,16px))]">
        {children}
      </main>

      <footer className="border-t px-4 py-6 text-sm opacity-70 max-w-5xl mx-auto">
        © {new Date().getFullYear()} My Site
      </footer>
    </div>
  );
}

