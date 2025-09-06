'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LOCALES } from '@/lib/constants';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {t('label')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {LOCALES.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => switchLocale(loc)}>
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
