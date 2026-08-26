import React from 'react';

import InlineAlert from '@synerise/ds-inline-alert';

import * as S from '../Array.styles';
import { type ArrayLimitProps } from '../Array.types';

export const ArrayLimit = ({ limit, count = 0, texts }: ArrayLimitProps) => {
  return (
    <S.Limit>
      <S.LimitPart>
        {count === limit ? (
          <InlineAlert type="warning" message={texts.array.limitReached} />
        ) : (
          texts.array.limitPrefix
        )}
      </S.LimitPart>
      <S.LimitPart>{` ${count}/${limit}`}</S.LimitPart>
    </S.Limit>
  );
};
