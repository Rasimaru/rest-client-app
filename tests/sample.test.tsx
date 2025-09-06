import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RootLayout, { metadata } from '../src/app/layout';
import MainPage from '@/app/(main)/page';
import NotFound from '@/app/not-found';
import SignInPage from '@/app/(auth)/sign-in/page';
import SignUpPage from '@/app/(auth)/sign-up/page';
import VariablesPage from '@/app/variables/page';
import HistoryPage from '@/app/history/page';
import RestClientPage from '@/app/rest-client/page';
import LocaleSwitcher from '@/components/shared/layout/LocaleSwitcher';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

jest.mock('@/styles/globals.css', () => ({}));

describe('Home page', () => {
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

  test('DropdownMenuTrigger opens menu and items render', async () => {
    const onClickMock = jest.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Test</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive" onClick={onClickMock}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem variant="default">Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Test');

    await userEvent.click(trigger);

    const deleteItem = screen.getByText('Delete');
    const editItem = screen.getByText('Edit');
    expect(deleteItem).toBeInTheDocument();
    expect(editItem).toBeInTheDocument();

    fireEvent.click(deleteItem);
    expect(onClickMock).toHaveBeenCalledTimes(1);

    fireEvent.click(trigger);
    expect(editItem).not.toBeInTheDocument();
  });
  test('DropdownMenuCheckboxItem toggles checked state', async () => {
    const onCheckedChange = jest.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Test</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Option 1
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Test');
    await userEvent.click(trigger);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(onCheckedChange).toHaveBeenCalled();
  });
});
