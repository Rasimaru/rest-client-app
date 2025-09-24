'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/constants';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPath = segments.join('/');

    router.push(newPath);

    //TODO: replace with better sollution
    // temporary sollution,
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer text-primary">
          {pathname.split('/')[1]?.toUpperCase() || 'EN'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-10 max-w-full">
        {LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => switchLocale(loc)}
          >
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
