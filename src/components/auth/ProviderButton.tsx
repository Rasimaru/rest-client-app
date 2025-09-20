'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

type ProviderButtonProps = {
  provider: string;
  icon?: React.ReactNode;
  label: string;
};

const ProviderButton = ({ provider, icon, label }: ProviderButtonProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-full cursor-pointer" onClick={() => signIn(provider)}>
        {icon}
        {label}
      </Button>
    </div>
  );
};

export default ProviderButton;
