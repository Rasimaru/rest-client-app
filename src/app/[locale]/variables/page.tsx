'use client';

import dynamic from 'next/dynamic';

const DynamicVariables = dynamic(() => import('@/components/pages/VariablesPage'), { ssr: false });

const VariablesPage = () => {
  return <DynamicVariables />;
};

export default VariablesPage;
