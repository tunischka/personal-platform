"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Show 2 cards at a time
    const visibleCount = 2;
    const totalProjects = projects.length;

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, [totalProjects]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    }, [totalProjects]);

    // Auto-slide logic
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide]);

    // Pause on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Get visible projects (handling wrap-around)
    const getVisibleProjects = () => {
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % totalProjects;
            visible.push({ ...projects[index], key: `project-${index}` });
        }
        return visible;
    };

    const visibleProjects = getVisibleProjects();

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto px-12 py-8"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                        {visibleProjects.map((project) => (
                            <motion.div
                                key={project.key}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                <ProjectCard
                                    {...project}
                                    className="h-64 w-full" // Fixed height as requested
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-lg transition-all z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-lg transition-all z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}
