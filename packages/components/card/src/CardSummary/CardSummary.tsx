import React from 'react';

import * as S from './CardSummary.styles';
import { type CardSummaryProps } from './CardSummary.types';
import { CardSummaryItem } from './CardSummaryItem';

export const CardSummary = ({ title, items, ...props }: CardSummaryProps) => {
  return (
    <S.CardSummaryWrapper {...props}>
      {title && <S.CardSummaryTitle level={5}>{title}</S.CardSummaryTitle>}
      <S.CardSummaryList>
        {items.map(({ key, ...item }) => (
          <CardSummaryItem {...item} key={key} />
        ))}
      </S.CardSummaryList>
    </S.CardSummaryWrapper>
  );
};
