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
    className,
}: ProjectCardProps) {
    const Inner = (
        <div className="flex items-center gap-6 h-full">
            <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10">
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
            <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {text}
                </p>
                {!!tags?.length && (
                    <div className="flex flex-wrap gap-1">
                        {tags.map((id) => (
                            <TagPill key={id} id={id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const baseClasses = cn(
        "rounded-3xl border border-gray-200/80 bg-white/70 dark:bg-white/5 shadow-sm p-6 transition h-full",
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
