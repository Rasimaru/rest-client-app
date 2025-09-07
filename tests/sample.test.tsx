import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../messages/en.json';
import NotFound from '@/app/not-found';
import '@testing-library/jest-dom';
import { metadata } from '@/app/layout';
import SignInPage from '@/app/[locale]/(auth)/sign-in/page';
import SignUpPage from '@/app/[locale]/(auth)/sign-up/page';
import VariablesPage from '@/app/[locale]/variables/page';
import HistoryPage from '@/app/[locale]/history/page';
import RestClientPage from '@/app/[locale]/rest-client/page';
import MainPage from '@/app/[locale]/(main)/page';

jest.mock('@/styles/globals.css', () => ({}));

describe('Initial screen', () => {
  it('metadata has title and description', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });
  it('renders 404 Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <NotFound />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders Main Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MainPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('renders SignIn Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders SignUp Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUpPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders Rest Client Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RestClientPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/Rest Client/i)).toBeInTheDocument();
  });

  it('renders History Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders Variables Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariablesPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });
});
