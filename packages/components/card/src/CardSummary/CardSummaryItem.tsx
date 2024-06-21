import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AngleDownS } from '@synerise/ds-icon';
import * as S from './CardSummary.styles';
import { CardSummaryItemProps } from './CardSummary.types';
import { ANIMATION_DURATION } from '../constants';

export const CardSummaryItem = ({ label, value, summaryRowObjects, ...rest }: CardSummaryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const withObjects = !!summaryRowObjects?.length;
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const icon = <S.Icon isOpen={isOpen} component={<AngleDownS />} onClick={handleClick} />;
  return (
    <S.CardSummaryItemWrapper {...rest}>
      <S.CardSummaryItemDetails>
        {label && <S.CardSummaryItemLabel size="small">{label}:</S.CardSummaryItemLabel>}
        <S.CardSummaryItemValue size="small">
          {value} {withObjects && icon}
        </S.CardSummaryItemValue>
      </S.CardSummaryItemDetails>
      {withObjects && (
        <S.AnimateHeight duration={ANIMATION_DURATION} height={isOpen ? 'auto' : 0} isOpen={isOpen}>
          <S.CardSummaryItemObjects>
            {summaryRowObjects?.map(object => (
              <S.CardSummaryItemObject key={object.key || uuid()}>{object}</S.CardSummaryItemObject>
            ))}
          </S.CardSummaryItemObjects>
        </S.AnimateHeight>
      )}
    </S.CardSummaryItemWrapper>
  );
};
