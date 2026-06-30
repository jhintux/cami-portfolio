"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("visible"), i * 70);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
