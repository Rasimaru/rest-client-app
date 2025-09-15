import Header from '@/components/shared/layout/Header';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/shared/AuthButtons', () => () => <div>AuthButtonsMock</div>);
jest.mock('@/components/shared/layout/LocaleSwitcher', () => () => <div>LocaleSwitcherMock</div>);

jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>);

describe('Header', () => {
  it('renders title and AuthButtons', () => {
    render(<Header />);

    expect(screen.getByText('REST Client App')).toBeInTheDocument();

    expect(screen.getByText('AuthButtonsMock')).toBeInTheDocument();
    expect(screen.getByText('LocaleSwitcherMock')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
