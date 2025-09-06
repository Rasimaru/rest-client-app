import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import RootLayout, { metadata } from '../src/app/layout';

jest.mock('@/styles/globals.css', () => ({}));

describe('Home page', () => {
  it('renders Test Page', () => {
    render(<Home />);
    expect(screen.getByText('TestPage')).toBeInTheDocument();
  });

  it('renders RootLayout with children', () => {
    render(
      <RootLayout>
        <></>
      </RootLayout>
    );
  });

  it('metadata has title and description', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });
});
