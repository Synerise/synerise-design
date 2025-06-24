import { useState, useCallback, useMemo } from 'react';
import type { FactorsTexts } from '../../../Factors.types';

type UseCollectorProps = {
  limit?: number;
  collectorCount: number;
  arrayValueCount?: number;
  texts: FactorsTexts;
};

export const useCollector = ({ limit, collectorCount, arrayValueCount = 0, texts }: UseCollectorProps) => {
  const [hasTypeError, setHasTypeError] = useState(false);

  const exceedsLimit = useCallback(
    (newItems: number) => {
      if (limit) {
        return newItems + arrayValueCount > limit;
      }
      return false;
    },
    [arrayValueCount, limit]
  );
  const collectorExceedsLimit = useMemo(() => exceedsLimit(collectorCount), [exceedsLimit, collectorCount]);

  const errorMessage = useMemo(() => {
    if (hasTypeError) {
      return texts.array.numericValidationError;
    }
    if (collectorExceedsLimit) {
      return texts.array.limitExceeded;
    }
    return undefined;
  }, [hasTypeError, collectorExceedsLimit, texts.array.limitExceeded, texts.array.numericValidationError]);

  const addEnabled = useMemo(() => {
    return !hasTypeError && !collectorExceedsLimit;
  }, [hasTypeError, collectorExceedsLimit]);

  return {
    disabled: !!(limit && arrayValueCount >= limit),
    error: !!errorMessage,
    errorMessage,
    setHasTypeError,
    exceedsLimit,
    addEnabled,
  };
};
