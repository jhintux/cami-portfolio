"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PortfolioImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

export function PortfolioImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  fill = true,
  width,
  height,
  style,
}: PortfolioImageProps) {
  const [loaded, setLoaded] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    if (priority) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "400px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [priority]);

  const imageClass = `${className} ${loaded ? "loaded" : ""}`.trim();

  if (fill) {
    return (
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
        {inView && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={imageClass}
            style={style}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {inView && (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 800}
          sizes={sizes}
          priority={priority}
          className={imageClass}
          style={style}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
