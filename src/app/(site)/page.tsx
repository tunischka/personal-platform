// src/app/(site)/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Bubblegum_Sans } from "next/font/google";
import ASCIIText from "@/components/blocks/ASCIIText.jsx";

const bubblegum = Bubblegum_Sans({ weight: "400", subsets: ["latin"] });

export default function Home() {


  // BUBBLE / GEO SHAPES (renk akışı YOK – B yolu)
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const isMobile = matchMedia("(max-width: 576px)").matches;
    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

    const created: HTMLElement[] = [];

    // bubbles
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

    // shapes
    const SHAPE_COUNT = isMobile ? 8 : 14;
    const TYPES = ["circle", "square", "triangle"];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      const s = document.createElement("span");
      s.className = `geo ${TYPES[Math.floor(Math.random() * TYPES.length)]}`;

      const hue = Math.round(rnd(0, 360)); // tek kez üret
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
    <section className="hero relative h-[100vh] grid place-items-center">
      {/* kabarcık katmanı */}
      <div ref={layerRef} className="bubble-layer" aria-hidden="true" />
      {/* başlık */}
      <div className="relative w-full h-[300px] flex items-center justify-center">
      <ASCIIText
        text="Tuna"
        asciiFontSize={7}
        textFontSize={200}
        textColor="#fdf9f3"
        planeBaseHeight={8}
        enableWaves={true}
      />
    </div>

    </section>
  );
}
