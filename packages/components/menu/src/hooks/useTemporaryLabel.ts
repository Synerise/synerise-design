import { useEffect, useState } from 'react';

export const useTemporaryLabel = (duration: number) => {
  const [temporaryLabel, setTemporaryLabel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTemporaryLabel(false), duration);
    return () => {
      clearTimeout(timer);
    };
  });

  return {
    temporaryLabel,
    setTemporaryLabel,
  };
};
