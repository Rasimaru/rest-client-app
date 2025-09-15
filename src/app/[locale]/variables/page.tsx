'use client';

import dynamic from 'next/dynamic';

const DynamicVariables = dynamic(() => import('@/app/[locale]/variables/VariablesPage'), {
  ssr: false
});

const VariablesPage = () => {
  return <DynamicVariables />;
};

export default VariablesPage;
