import { useTranslations } from 'next-intl';

const HistoryPage = () => {
  const t = useTranslations('History');

  return <div>{t('title')}</div>;
};

export default HistoryPage;
