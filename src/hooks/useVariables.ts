'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rest-client-variables';

export function useVariables() {
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setVariables(JSON.parse(stored));
  }, []);

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
