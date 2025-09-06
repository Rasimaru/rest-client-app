import { useTranslations } from 'next-intl';

const RestClientPage = () => {
  const t = useTranslations('RestClientPage');

  return <div>{t('title')}</div>;
};

export default RestClientPage;
