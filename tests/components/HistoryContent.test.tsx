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

    expect(screen.getAllByText(/GET/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Status: 200/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Latency: 123ms/)[0]).toBeInTheDocument();

    expect(screen.getAllByText(/POST/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Status: 500/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Latency: 200ms/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Error: Server error/)[0]).toBeInTheDocument();
  });
});
