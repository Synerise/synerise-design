import { useEffect, useState } from 'react';

export const useTemporaryLabel = (duration: number) => {
  const [temporaryLabel, setTemporaryLabel] = useState(false);

  useEffect(() => {
    if (!temporaryLabel) {
      return;
    }
    const timer = setTimeout(() => setTemporaryLabel(false), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [temporaryLabel, duration]);

  return {
    temporaryLabel,
    setTemporaryLabel,
  };
};
