// src/content/nav.ts
export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  {
    label: "ttunatartare",
    href: "/ttunatartare",
    children: [
      { label: "Reviews", href: "/ttunatartare/reviews" },
      // { label: "Blog", href: "/ttunatartare/blog" }, // sonra açarız
    ],
  },
  { label: "CV", href: "/(site)/cv" },
];
