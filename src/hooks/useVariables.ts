'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rest-client-variables';

export function useVariables() {
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  // Save variables to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(variables));
  }, [variables]);

  function addVariable(key: string, value: string) {
    setVariables((prev) => ({ ...prev, [key]: value }));
  }

  function removeVariable(key: string) {
    setVariables((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }

  return { variables, addVariable, removeVariable };
}
