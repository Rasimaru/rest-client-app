import { render, screen } from '@testing-library/react';
import MainContent from '@/components/main/MainContent';
import { useSession } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';

jest.mock('@/components/shared/AuthButtons', () => () => <div>AuthButtonsMock</div>);

describe('MainContent', () => {
  it('renders loading state', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MainContent />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(messages.status.loading)).toBeInTheDocument();
  });

  it('renders unauthenticated user', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MainContent />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('AuthButtonsMock')).toBeInTheDocument();
  });

  it('renders authenticated user', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'User', email: 'test@example.com' } },
      status: 'authenticated'
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <MainContent />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Welcome, User!')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.queryByText('AuthButtonsMock')).not.toBeInTheDocument();
  });
});
