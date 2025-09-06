import { fireEvent, render, screen } from '@testing-library/react';
import { metadata } from '../src/app/layout';
import MainPage from '@/app/[locale]/(main)/page';
import NotFound from '@/app/not-found';
import SignInPage from '@/app/(auth)/sign-in/page';
import SignUpPage from '@/app/(auth)/sign-up/page';
import VariablesPage from '@/app/[locale]/variables/page';
import HistoryPage from '@/app/[locale]/history/page';
import RestClientPage from '@/app/[locale]/rest-client/page';
import LocaleSwitcher from '@/components/shared/layout/LocaleSwitcher';
import Layout from '@/components/shared/layout/Layout';

jest.mock('@/styles/globals.css', () => ({}));

describe('Initial screen', () => {
  it('renders Layout with children', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    expect(screen.getByText('Rest Client App')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText(/2025/i)).toBeInTheDocument();
  });

  it('metadata has title and description', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });

  it('renders 404 Page', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders Main Page', () => {
    render(<MainPage />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('renders SignIn Page', () => {
    render(<SignInPage />);
    expect(screen.getByText('SignIn page')).toBeInTheDocument();
  });

  it('renders SignUp Page', () => {
    render(<SignUpPage />);
    expect(screen.getByText('SignUp page')).toBeInTheDocument();
  });

  it('renders Rest Client Page', () => {
    render(<RestClientPage />);
    expect(screen.getByText('Rest Client Page')).toBeInTheDocument();
  });

  it('renders History Page', () => {
    render(<HistoryPage />);
    expect(screen.getByText('History Page')).toBeInTheDocument();
  });

  it('renders Variables Page', () => {
    render(<VariablesPage />);
    expect(screen.getByText('Variables page')).toBeInTheDocument();
  });

  it('renders LocaleSwitcher', async () => {
    render(<LocaleSwitcher />);
    const trigger = screen.getByText('EN');
    expect(trigger).toBeInTheDocument();

    await fireEvent.click(trigger);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
