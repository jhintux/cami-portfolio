"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type LightboxContextValue = {
  open: (src: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const { t } = useTranslation();

  const open = useCallback((imageSrc: string) => {
    setSrc(imageSrc);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setSrc(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <div
        className={`lightbox${src ? " active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!src}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={close}
          aria-label={t("lightbox.close")}
        >
          &times;
        </button>
        {src && (
          <Image
            src={src}
            alt=""
            width={1920}
            height={1080}
            sizes="92vw"
            style={{ width: "auto", height: "auto", maxWidth: "92vw", maxHeight: "92vh" }}
            unoptimized
          />
        )}
      </div>
    </LightboxContext.Provider>
  );
}
