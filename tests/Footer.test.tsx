import Footer from '@/components/shared/layout/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('renders GitHub link, school link and year', () => {
    render(<Footer />);

    expect(screen.getByLabelText('GitHub profile')).toBeInTheDocument();
    expect(screen.getByText('© 2025')).toBeInTheDocument();
    expect(screen.getByLabelText('RS School')).toBeInTheDocument();
  });
});
