// src/app/(site)/projects/page.tsx
import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "My Projects",
  description: "A collection of my projects and case studies.",
};

export default function Page() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-center mb-10">My Projects</h1>
        <ProjectsClient />
        <div className="mt-12 rounded-3xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-500">
          More projects coming soon...
        </div>
      </div>
    </section>
  );
}
