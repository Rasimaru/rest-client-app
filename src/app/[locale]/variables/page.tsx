'use client';

import { Button } from '@/components/ui/button';
import { useVariables } from '@/hooks/useVariables';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const VariablesPage = () => {
  const t = useTranslations('VariablesPage');

  const { variables, addVariable, removeVariable } = useVariables();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!key.trim() || !value.trim()) return;
    addVariable(key.trim(), value.trim());
    setKey('');
    setValue('');
  };

  return (
    <section className="p-6 space-y-6">
      <div className="container">
        <h2 className="mb-4">{t('title')}</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              className="border p-2 rounded-md"
              placeholder={t('inputNamePlaceholder')}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <input
              className="border p-2 rounded-md"
              placeholder={t('inputValuePlaceholder')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="secondary" onClick={handleAdd}>
              {t('addButton')}
            </Button>
          </div>

          {Object.keys(variables).length === 0 ? (
            <p className="text-gray-500 text-sm">{t('noVariablesMessage')}</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(variables).map(([k, v]) => (
                <li key={k} className="flex items-center justify-between rounded-lg border p-2">
                  <div>
                    <span className="font-semibold">{k}</span>:
                    <span className="text-gray-400 ml-4">{v}</span>
                  </div>
                  <Button variant="destructive" onClick={() => removeVariable(k)}>
                    {t('removeButton')}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default VariablesPage;
