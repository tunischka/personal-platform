"use client";

import { useEffect, useRef } from "react";
import { Bubblegum_Sans } from "next/font/google";
import GradientText from "@/components/GradientText";
import TextType from "@/components/TextType";
import ProjectCarousel from "@/components/ProjectCarousel";

const bubblegum = Bubblegum_Sans({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isMobile = matchMedia("(max-width: 576px)").matches;
    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;
    const created: HTMLElement[] = [];

    const BUBBLE_COUNT = isMobile ? 14 : 26;
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const b = document.createElement("span");
      b.className = "bubble";
      b.style.setProperty("--size", `${Math.round(rnd(22, 48))}px`);
      b.style.setProperty("--x", `${rnd(0, 100).toFixed(2)}%`);
      b.style.setProperty("--dur", `${rnd(12, 20).toFixed(2)}s`);
      b.style.setProperty("--delay", `${rnd(-20, 0).toFixed(2)}s`);
      b.style.setProperty("--spin", `${rnd(14, 26).toFixed(2)}s`);
      b.style.setProperty("--spinDelay", `${rnd(-10, 0).toFixed(2)}s`);
      b.style.setProperty("--op", `${rnd(0.35, 0.7).toFixed(2)}`);
      b.style.setProperty("--rot", `${Math.round(rnd(0, 180))}deg`);
      b.style.setProperty("--hue", `${Math.round(rnd(0, 360))}deg`);
      layer.appendChild(b);
      created.push(b);
    }

    const SHAPE_COUNT = isMobile ? 8 : 14;
    const TYPES = ["circle", "square", "triangle"];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      const s = document.createElement("span");
      s.className = `geo ${TYPES[Math.floor(Math.random() * TYPES.length)]}`;
      const hue = Math.round(rnd(0, 360));
      s.style.setProperty("--size", `${Math.round(rnd(24, 52))}px`);
      s.style.setProperty("--x", `${rnd(0, 100).toFixed(2)}%`);
      s.style.setProperty("--dur", `${rnd(14, 22).toFixed(2)}s`);
      s.style.setProperty("--delay", `${rnd(-20, 0).toFixed(2)}s`);
      s.style.setProperty("--op", `${rnd(0.25, 0.5).toFixed(2)}`);
      s.style.setProperty("--rot", `${Math.round(rnd(0, 180))}deg`);
      s.style.setProperty("--hue", `${hue}deg`);
      layer.appendChild(s);
      created.push(s as HTMLElement);
    }

    return () => {
      created.forEach((el) => el.remove());
    };
  }, []);

  return (
    <section className="hero relative h-[100vh] grid place-items-center overflow-hidden">
      {/* kabarcık katmanı */}
      <div ref={layerRef} className="bubble-layer absolute inset-0" aria-hidden="true" />

      {/* yazı */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto flex flex-col items-center gap-12">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className={`text-8xl md:text-9xl font-extrabold ${bubblegum.className}`}
        >
          <TextType
            text={["Tuna", "ttunatartare"]}
            typingSpeed={100}
            deletingSpeed={50}
            loop
          />
        </GradientText>

        <ProjectCarousel />
      </div>
    </section>
  );
}
