import { useTranslations } from 'next-intl';

const SignInPage = () => {
  const t = useTranslations('SignInPage');

  return <div>{t('title')}</div>;
};

export default SignInPage;
