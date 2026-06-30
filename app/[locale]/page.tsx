import type { Metadata } from "next";
import { notFound } from "next/navigation";
import en from "@/locales/en/translation.json";
import es from "@/locales/es/translation.json";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { LightboxProvider } from "@/components/portfolio/Lightbox";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { isLocale, type Locale } from "@/lib/i18n/settings";

const metaByLocale = { en, es } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const meta = metaByLocale[locale].meta;
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <I18nProvider locale={locale as Locale}>
      <LightboxProvider>
        <Portfolio locale={locale as Locale} />
      </LightboxProvider>
    </I18nProvider>
  );
}
