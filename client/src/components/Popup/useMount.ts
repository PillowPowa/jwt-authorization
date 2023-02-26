import { useState, useEffect } from 'react';
export const ANIMATION_TIME_MS = 400;

/* eslint-disable react-hooks/exhaustive-deps */
export const useMount = (opened: boolean) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!opened && mounted) {
      setTimeout(() => setMounted(false), ANIMATION_TIME_MS);
    } else if (opened && !mounted) {
      setMounted(true);
    }
  }, [opened]);

  return mounted;
}