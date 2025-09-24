import { routing } from '@/i18n/routing';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedPath(pathname: string, route: string): string {
  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}/`)) ?? routing.defaultLocale;

  return `/${locale}${route.startsWith('/') ? route : `/${route}`}`;
}

export function stripLocale(pathname: string) {
  const locale = routing.locales.find((l) => pathname.startsWith(`/${l}/`));
  if (!locale) return pathname;
  return pathname.replace(`/${locale}`, '');
}
