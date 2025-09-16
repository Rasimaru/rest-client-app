import { render, screen } from '@testing-library/react';
import LocaleSwitcher from '@/components/shared/layout/LocaleSwitcher';
import { useRouter, usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));
describe('LocaleSwitcher', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/en/');
  });

  it('should render the component', () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText(/EN/i)).toBeInTheDocument();
  });
});
