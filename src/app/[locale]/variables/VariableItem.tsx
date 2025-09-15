import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type VariableProps = {
  k: string;
  v: string;
  removeVariable: (key: string) => void;
};

export default function VariableItem({ k, v, removeVariable }: VariableProps) {
  const t = useTranslations('VariablesPage');

  return (
    <li key={k} className="flex items-center justify-between rounded-lg border p-2">
      <div>
        <span className="font-semibold">{k}</span>:<span className="text-gray-400 ml-4">{v}</span>
      </div>
      <Button variant="destructive" onClick={() => removeVariable(k)}>
        {t('removeButton')}
      </Button>
    </li>
  );
}
