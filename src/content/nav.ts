// src/content/nav.ts
export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "CV", href: "/cv" },
  {
    label: "ttunatartare",
    href: "/ttunatartare",
    children: [
      { label: "Reviews", href: "/ttunatartare/reviews" },
      // { label: "Blog", href: "/ttunatartare/blog" }, // sonra açarız
    ],
  },
  
];
