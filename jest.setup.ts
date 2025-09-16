import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';

(global as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(global as unknown as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;

jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const map: Record<string, Record<string, string>> = {
      Header: { title: 'REST Client App', linkAriaLabel: 'Go to main page' },
      Footer: {
        githubLinkAriaLabel: 'GitHub profile',
        schoolLinkAriaLabel: 'RS School',
        schoolImgAlt: 'School logo'
      },
      MainContent: {
        title: 'Welcome',
        buttonRestClient: 'Rest Client',
        buttonHistory: 'History',
        buttonVariables: 'Variables'
      },
      SignInPage: { title: 'Sign In' },
      SignUpPage: { title: 'Sign Up' },
      RestClientPage: { title: 'REST Client' },
      History: { title: 'History' },
      VariablesPage: {
        title: 'Manage Variables',
        inputNamePlaceholder: 'Variable name',
        inputValuePlaceholder: 'Value',
        addButton: 'Add',
        noVariablesMessage: 'No variables yet',
        removeButton: 'Remove'
      },
      button: {
        signIn: 'Sign In',
        signInAriaLabel: 'Go to sign-in page',
        signUp: 'Sign Up',
        signUpAriaLabel: 'Go to sign-up page',
        signOut: 'Sign Out',
        signOutAriaLabel: 'Sign Out from your account'
      }
    };
    return map[namespace]?.[key] || key;
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), pathname: '/' }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({})
}));

jest.mock('@/auth', () => ({
  handlers: [],
  signIn: jest.fn(),
  signOut: jest.fn(),
  auth: {}
}));

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.ComponentProps<'a'> & { children: React.ReactNode }) =>
    React.createElement('a', props, props.children)
}));
