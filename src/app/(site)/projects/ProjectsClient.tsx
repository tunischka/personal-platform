"use client";

import TagFilterBar from "@/components/tags/TagFilterBar";
import { useTagFilterSort } from "@/hooks/useTagFilterSort";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

// Liste + filtre/sort
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
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </>
  );
}

