import { useEffect, useState } from "react";

export function useScrollProgress(max = 140) {
  const [p, setP] = useState(0); // 0 → tepe, 1 → ~max px

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const clamped = Math.min(1, y / max);
      setP(clamped);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [max]);

  return p;
}
