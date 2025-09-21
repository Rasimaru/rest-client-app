import Footer from '@/components/shared/layout/Footer';
import { render, screen } from '@testing-library/react';
import messages from '../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

describe('Footer', () => {
  it('renders GitHub link, school link and year', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(messages.Footer.githubLinkAriaLabel)).toBeInTheDocument();
    expect(screen.getByText('© 2025')).toBeInTheDocument();
    expect(screen.getByLabelText(messages.Footer.schoolLinkAriaLabel)).toBeInTheDocument();
  });
});
