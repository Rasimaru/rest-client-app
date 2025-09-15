import { Button } from '@/components/ui/button';
import { useVariables } from '@/hooks/useVariables';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Input from '@/components/shared/Input';
import VariableItem from './VariableItem';

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
          <div className="flex gap-2 flex-col md:flex-row">
            <Input
              placeholder={t('inputNamePlaceholder')}
              value={key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
            />
            <Input
              placeholder={t('inputValuePlaceholder')}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
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
                <VariableItem key={k} k={k} v={v} removeVariable={removeVariable} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default VariablesPage;
