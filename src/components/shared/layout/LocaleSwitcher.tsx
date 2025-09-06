import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { JSX } from 'react';

const LocaleSwitcher = (): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          EN
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>EN</DropdownMenuItem>
        <DropdownMenuItem>RU</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LocaleSwitcher;
