import Image from "next/image";
import Link from "next/link";
import TagPill from "@/components/tags/TagPill";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps extends Project {
    className?: string;
}

export default function ProjectCard({
    href,
    title,
    text,
    imgSrc,
    imgAlt,
    tags,
    date,
    className,
}: ProjectCardProps) {
    const Inner = (
        <div className="flex items-start gap-6 h-full">
            <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10 mt-1">
                {imgSrc ? (
                    <Image
                        src={imgSrc}
                        alt={imgAlt || title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full grid place-items-center text-sm text-gray-400">
                        (image)
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col h-full">
                <div className="mb-auto">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {text}
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    {!!tags?.length ? (
                        <div className="flex flex-wrap gap-1">
                            {tags.slice(0, 2).map((id) => (
                                <TagPill key={id} id={id} />
                            ))}
                        </div>
                    ) : (
                        <div />
                    )}

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:scale-105">
                        Read more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </span>
                </div>
            </div>
        </div>
    );

    const baseClasses = cn(
        "rounded-3xl border border-gray-200/80 bg-white/70 dark:bg-white/5 shadow-sm p-6 transition h-full group",
        className
    );

    return href ? (
        <Link href={href} className={`block hover:shadow-md ${baseClasses}`}>
            {Inner}
        </Link>
    ) : (
        <div className={baseClasses}>{Inner}</div>
    );
}
