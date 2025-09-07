import { useTranslations } from 'next-intl';

const SignUpPage = () => {
  const t = useTranslations('SignUpPage');

  return <div>{t('title')}</div>;
};

export default SignUpPage;
