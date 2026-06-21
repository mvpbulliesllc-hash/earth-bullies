import type { LocalePrefixMode } from 'next-intl/routing';
import type { AppLocale } from '@/types/I18n';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

// English-first (v1). Arabic (ar) + RTL is planned for a later phase — add the
// locale object here and set dir="rtl" on <html> when locale === 'ar'.
const locales = [
  {
    id: 'en',
    name: 'English',
  },
] satisfies AppLocale[];

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'Earth Bullies',
  i18n: {
    locales,
    defaultLocale: 'en',
    localePrefix,
  },
  email: {
    support: 'info@earthbullies.com',
  },
} as const;

export const AllLocales = AppConfig.i18n.locales.map(locale => locale.id);
