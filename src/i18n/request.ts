import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = {
    button: (await import(`../../messages/${locale}/button.json`)).default,
    Header: (await import(`../../messages/${locale}/Header.json`)).default,
    Footer: (await import(`../../messages/${locale}/Footer.json`)).default,
    MainContent: (await import(`../../messages/${locale}/MainContent.json`)).default,
    SignInPage: (await import(`../../messages/${locale}/SignInPage.json`)).default,
    SignUpPage: (await import(`../../messages/${locale}/SignUpPage.json`)).default,
    RestClientPage: (await import(`../../messages/${locale}/RestClientPage.json`)).default,
    History: (await import(`../../messages/${locale}/History.json`)).default,
    language: (await import(`../../messages/${locale}/language.json`)).default,
    VariablesPage: (await import(`../../messages/${locale}/VariablesPage.json`)).default,
    NotFound: (await import(`../../messages/${locale}/NotFound.json`)).default
  };

  return {
    locale,
    messages
  };
});
