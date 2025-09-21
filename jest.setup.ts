import '@testing-library/jest-dom';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';

(global as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(global as unknown as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;

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
