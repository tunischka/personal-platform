"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

interface GradientTextProps {
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
  children: ReactNode;
}

export default function GradientText({
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 3,
  showBorder = false,
  className = "",
  children,
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <div
      className={clsx(
        "bg-clip-text text-transparent font-bold inline-block",
        "animate-gradient",
        showBorder && "border-2 border-transparent bg-origin-border bg-clip-border",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300%",
        animation: `gradientFlow ${animationSpeed}s ease infinite`,
      }}
    >
      {children}
    </div>
  );
}
