"use client";

import { useMemo, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import type { Locale } from "@/lib/i18n/settings";
import { createI18nInstance } from "@/lib/i18n/client";

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const i18n = useMemo(() => createI18nInstance(locale), [locale]);

  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
