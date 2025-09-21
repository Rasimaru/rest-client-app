import { render, screen } from '@testing-library/react';
import HistoryContent, { HistoryItem } from '@/components/history/HistoryContent';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';

describe('HistoryContent', () => {
  const mockRequests: HistoryItem[] = [
    {
      id: '1',
      method: 'GET',
      url: '/api/test',
      createdAt: '2025-09-21T15:00:00.000Z',
      latency: 123,
      statusCode: 200,
      requestSize: 456,
      responseSize: 789,
      error: null
    },
    {
      id: '2',
      method: 'POST',
      url: '/api/test',
      createdAt: '2025-09-21T15:05:00.000Z',
      latency: 200,
      statusCode: 500,
      requestSize: 100,
      responseSize: 50,
      error: 'Server error'
    }
  ];

  it('renders empty state when no requests', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryContent requests={[]} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/You haven't executed any requests yet/i)).toBeInTheDocument();
    expect(screen.getByText(/REST client/i)).toBeInTheDocument();
  });

  it('renders list of requests', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryContent requests={mockRequests} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/GET/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: 200/)).toBeInTheDocument();
    expect(screen.getByText(/Latency: 123ms/)).toBeInTheDocument();

    expect(screen.getByText(/POST/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: 500/)).toBeInTheDocument();
    expect(screen.getByText(/Latency: 200ms/)).toBeInTheDocument();
    expect(screen.getByText(/Error: Server error/)).toBeInTheDocument();
  });
});
