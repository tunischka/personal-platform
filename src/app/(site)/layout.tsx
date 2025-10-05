import "@/app/globals.css";
import { siteConfig } from "@/lib/config/site";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from "@/components/ui/resizable-navbar"; // ⬅️ aynı dosyadan geliyor

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "CV", link: "/cv" },
  { name: "ttunatartare", link: "/ttunatartare" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen ${inter.className}`}>
      {/* NAVBAR */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
        </NavBody>
      </Navbar>

      {/* navbar yüksekliği kadar padding */}
      <main className="pt-[calc(var(--nav-h,72px)+var(--nav-gap,16px))]">
        {children}
      </main>

      <footer className="border-t px-4 py-6 text-sm opacity-70 max-w-5xl mx-auto">
        © {new Date().getFullYear()} My Site
      </footer>
    </div>
  );
}
