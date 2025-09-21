import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import VariablesPage from '@/app/[locale]/variables/VariablesPage';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

describe('Variables Page', () => {
  it('renders Variables Page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariablesPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/Manage Variables/i)).toBeInTheDocument();
    expect(screen.getByText(messages.VariablesPage.noVariablesMessage)).toBeInTheDocument();
  });

  it('adds a variable', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariablesPage />
      </NextIntlClientProvider>
    );

    const nameInput = screen.getByPlaceholderText(
      messages.VariablesPage.inputNamePlaceholder
    ) as HTMLInputElement;
    const valueInput = screen.getByPlaceholderText(
      messages.VariablesPage.inputValuePlaceholder
    ) as HTMLInputElement;
    const addButton = screen.getByText(messages.VariablesPage.addButton);

    // Add a variable
    fireEvent.change(nameInput, { target: { value: 'testKey' } });
    fireEvent.change(valueInput, { target: { value: 'testValue' } });
    fireEvent.click(addButton);

    expect(screen.getByText('testKey')).toBeInTheDocument();
    expect(screen.getByText('testValue')).toBeInTheDocument();

    // Remove the variable
    const removeButton = screen.getByText(messages.VariablesPage.removeButton);
    fireEvent.click(removeButton);

    expect(screen.queryByText('testKey')).not.toBeInTheDocument();
    expect(screen.queryByText('testValue')).not.toBeInTheDocument();
    expect(screen.getByText(messages.VariablesPage.noVariablesMessage)).toBeInTheDocument();
  });
});
