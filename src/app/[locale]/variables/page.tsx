import { useTranslations } from 'next-intl';

const VariablesPage = () => {
  const t = useTranslations('VariablesPage');

  return <div>{t('title')}</div>;
};

export default VariablesPage;
