"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";
import { SkillBars } from "./SkillBars";
import {
  brandingItems,
  illustrationItems,
  images,
  merchItems,
  webItems,
} from "@/lib/portfolio-data";
import { useLightbox } from "./Lightbox";
import { PortfolioImage } from "./PortfolioImage";
import type { GalleryItem } from "@/lib/portfolio-data";
import type { Locale } from "@/lib/i18n/settings";

function GalleryGrid({
  items,
  section,
  cols = 2,
}: {
  items: GalleryItem[];
  section: "illustration" | "merch" | "branding";
  cols?: 2 | 3;
}) {
  const { open } = useLightbox();
  const { t } = useTranslation();

  return (
    <div className={`gallery-grid cols-${cols}`}>
      {items.map((item) => (
        <Reveal
          key={item.src}
          className={`gallery-item${item.feature ? " feature" : ""}`}
        >
          <div
            role="button"
            tabIndex={0}
            style={{ position: "absolute", inset: 0, cursor: "zoom-in" }}
            onClick={() => open(item.src)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") open(item.src);
            }}
          >
            {item.badge && (
              <div
                className={
                  item.badge === "fanart" ? "fanart-badge" : "oc-badge"
                }
              >
                {t(
                  item.badge === "fanart"
                    ? "illustration.badgeFanart"
                    : "illustration.badgeOc",
                )}
              </div>
            )}
            <PortfolioImage
              src={item.src}
              alt={t(`${section}.items.${item.id}.alt`)}
              sizes={
                item.feature
                  ? "(max-width: 768px) 100vw, 66vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
            />
            <div className="gallery-item-label">
              {t(`${section}.items.${item.id}.label`)}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const { open } = useLightbox();
  const { t } = useTranslation();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const otherLocale = locale === "en" ? "es" : "en";

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <nav>
        <span className="nav-logo">@thewitchkeeper_</span>
        <ul className="nav-links">
          <li>
            <a href="#ilustracion">{t("nav.illustration")}</a>
          </li>
          <li>
            <a href="#merch">{t("nav.merch")}</a>
          </li>
          <li>
            <a href="#branding">{t("nav.branding")}</a>
          </li>
          <li>
            <a href="#web">{t("nav.web")}</a>
          </li>
          <li>
            <a href="#contacto">{t("nav.contact")}</a>
          </li>
          <li>
            <Link href={`/${otherLocale}`} className="lang-switch">
              {t("nav.langSwitch")}
            </Link>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className={`hero-bg${heroLoaded ? " loaded" : ""}`}>
          <Image
            src={images.heroCover}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">{t("hero.tag")}</span>
          <h1 className="hero-title">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
            <br />
            {t("hero.titleLine3")}
          </h1>
          <p className="hero-sub">{t("hero.subtitle")}</p>
        </div>
        <div className="hero-scroll">{t("hero.scroll")}</div>
      </section>

      <section className="about" id="about">
        <Reveal className="about-text">
          <h2>
            {t("about.titleLine1")}
            <br />
            {t("about.titleLine2")}
          </h2>
          <p>{t("about.paragraph1")}</p>
          <p>{t("about.paragraph2")}</p>
        </Reveal>
        <SkillBars />
      </section>

      <section id="ilustracion">
        <Reveal className="section-header">
          <div className="header-inner">
            <h2>
              {t("illustration.titleLine1")}
              <br />
              <em>{t("illustration.titleLine2")}</em>.
            </h2>
            <span className="section-tag">{t("illustration.tag")}</span>
          </div>
        </Reveal>
        <GalleryGrid items={illustrationItems} section="illustration" />
      </section>

      <section id="merch">
        <Reveal className="section-header">
          <div className="header-inner">
            <h2>
              {t("merch.titleLine1")}
              <br />
              <em>{t("merch.titleLine2")}</em>
            </h2>
            <span className="section-tag">{t("merch.tag")}</span>
          </div>
        </Reveal>
        <GalleryGrid items={merchItems} section="merch" />
      </section>

      <section id="branding" className="branding-section">
        <Reveal className="section-header">
          <div className="header-inner">
            <h2>
              {t("branding.titleLine1")}
              <br />— <em>{t("branding.titleLine2")}</em>
              <br />
              <em>{t("branding.titleLine3")}</em>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "8px",
              }}
            >
              <span className="brand-active-badge">
                {t("branding.activeBadge")}
              </span>
              <span className="section-tag">{t("branding.tag")}</span>
            </div>
          </div>
        </Reveal>
        <Reveal className="brand-intro">
          <div className="brand-name">
            Montaráz
            <br />
            <small
              style={{
                fontSize: "0.42em",
                letterSpacing: "0.1em",
                color: "rgba(200,245,53,0.6)",
                fontWeight: 300,
              }}
            >
              {t("branding.tagline")}
            </small>
          </div>
          <div className="brand-desc">
            <Trans i18nKey="branding.description" components={{ strong: <strong /> }} />
          </div>
        </Reveal>
        <GalleryGrid items={brandingItems} section="branding" />

        <Reveal
          className="fashion-sub-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h3>
            {t("branding.fashionTitle")} <em>{t("branding.fashionEmphasis")}</em>
          </h3>
          <span className="fashion-sub-tag">{t("branding.fashionTag")}</span>
        </Reveal>
        <Reveal className="fashion-img-wrap">
          <div
            role="button"
            tabIndex={0}
            onClick={() => open(images.fashionSketches)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                open(images.fashionSketches);
            }}
          >
            <PortfolioImage
              src={images.fashionSketches}
              alt={t("branding.fashionAlt")}
              fill={false}
              width={1920}
              height={620}
              sizes="100vw"
            />
          </div>
        </Reveal>
      </section>

      <section id="web" className="web-section">
        <Reveal className="section-header">
          <div className="header-inner">
            <h2>
              {t("web.titleLine1")}
              <br />
              <em>{t("web.titleLine2")}</em>
            </h2>
            <span className="section-tag">{t("web.tag")}</span>
          </div>
        </Reveal>
        <Reveal className="web-intro">
          <Trans i18nKey="web.intro" components={{ strong: <strong /> }} />
        </Reveal>
        <div className="web-grid" style={{ marginBottom: "6px" }}>
          {webItems
            .filter((item) => item.wide)
            .map((item) => (
              <Reveal key={item.src} className="web-item wide">
                <div
                  role="button"
                  tabIndex={0}
                  style={{ position: "absolute", inset: 0, cursor: "zoom-in" }}
                  onClick={() => open(item.src)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") open(item.src);
                  }}
                >
                  <div className="web-badge">
                    {t(`web.badges.${item.badgeKey}`)}
                  </div>
                  <PortfolioImage
                    src={item.src}
                    alt={t(`web.items.${item.id}.alt`)}
                    sizes="100vw"
                  />
                </div>
              </Reveal>
            ))}
        </div>
        <div className="web-grid cols-3">
          {webItems
            .filter((item) => !item.wide)
            .map((item) => (
              <Reveal key={item.src} className="web-item">
                <div
                  role="button"
                  tabIndex={0}
                  style={{ position: "absolute", inset: 0, cursor: "zoom-in" }}
                  onClick={() => open(item.src)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") open(item.src);
                  }}
                >
                  <div className="web-badge">
                    {t(`web.badges.${item.badgeKey}`)}
                  </div>
                  <PortfolioImage
                    src={item.src}
                    alt={t(`web.items.${item.id}.alt`)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      <section id="contacto" className="closing-section">
        <Reveal className="closing-card">
          <div
            role="button"
            tabIndex={0}
            onClick={() => open(images.closingCard)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                open(images.closingCard);
            }}
          >
            <PortfolioImage
              src={images.closingCard}
              alt={t("contact.closingAlt")}
              sizes="260px"
            />
          </div>
        </Reveal>
        <Reveal className="closing-text">
          <h2>
            {t("contact.titleLine1")}
            <br />
            {t("contact.titleLine2")}
            <br />
            {t("contact.titleLine3")}
          </h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-label">{t("contact.emailLabel")}</div>
              <a
                href="mailto:camiloestacio1897@gmail.com"
                className="contact-value"
              >
                camiloestacio1897@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">{t("contact.phoneLabel")}</div>
              <a href="tel:+573042252413" className="contact-value">
                +57 304 225 2413
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">{t("contact.instagramLabel")}</div>
              <a
                href="https://instagram.com/thewitchkeeper_"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
              >
                @thewitchkeeper_
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer>
        <span>{t("footer.credit")}</span>
        <span>{t("footer.copyright")}</span>
      </footer>
    </>
  );
}
