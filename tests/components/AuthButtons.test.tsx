import AuthButtons from '@/components/shared/AuthButtons';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';

describe('AuthButtons', () => {
  it('renders sign in button when unauthenticated', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthButtons />
      </NextIntlClientProvider>
    );

    const signInButton = await screen.findByLabelText('Go to sign-in page');
    const signUpButton = await screen.findByLabelText('Go to sign-up page');

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('renders sign out and main page buttons when authenticated', async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'User', email: 'test@example.com' } },
      status: 'authenticated'
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthButtons />
      </NextIntlClientProvider>
    );

    const mainPageButton = await screen.findByText(messages.button.mainPage);
    expect(mainPageButton).toBeInTheDocument();

    const signOutButton = await screen.findByText(messages.button.signOut);
    expect(signOutButton).toBeInTheDocument();
  });
});
