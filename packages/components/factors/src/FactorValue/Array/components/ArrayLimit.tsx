import React from 'react';
import { IconAlert } from '@synerise/ds-alert';

import * as S from '../Array.styles';
import { ArrayLimitProps } from '../Array.types';

export const ArrayLimit = ({ limit, count = 0, texts }: ArrayLimitProps) => {
  return (
    <S.Limit>
      <S.LimitPart>
        {count === limit ? (
          <IconAlert iconAlert type="warning" message={texts.array.limitReached} />
        ) : (
          texts.array.limitPrefix
        )}
      </S.LimitPart>
      <S.LimitPart>{` ${count}/${limit}`}</S.LimitPart>
    </S.Limit>
  );
};
