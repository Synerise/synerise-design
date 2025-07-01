import React, { useMemo } from 'react';

import * as S from '../Input.styles';
import { type InputProps } from '../Input.types';

type UseCounterLimitOptions = Pick<
  InputProps,
  'counterLimit' | 'renderCustomCounter'
> & { charCount?: number };

export const useCounterLimit = ({
  charCount,
  counterLimit,
  renderCustomCounter,
}: UseCounterLimitOptions) => {
  return useMemo(() => {
    if (renderCustomCounter) {
      return (
        <S.Counter data-testid="custom-counter">
          {renderCustomCounter(charCount)}
        </S.Counter>
      );
    }
    return counterLimit ? (
      <S.Counter data-testid="counter">
        {charCount}/{counterLimit}
      </S.Counter>
    ) : undefined;
  }, [charCount, counterLimit, renderCustomCounter]);
};
