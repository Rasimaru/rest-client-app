import Header from '@/components/shared/layout/Header';
import { render, screen } from '@testing-library/react';
import messages from '../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('@/components/shared/AuthButtons', () => () => <div>AuthButtonsMock</div>);
jest.mock('@/components/shared/layout/LocaleSwitcher', () => () => <div>LocaleSwitcherMock</div>);

jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>);

describe('Header', () => {
  it('renders title and AuthButtons', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(messages.Header.title)).toBeInTheDocument();

    expect(screen.getByText('AuthButtonsMock')).toBeInTheDocument();
    expect(screen.getByText('LocaleSwitcherMock')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
