import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AnimateHeight from 'react-animate-height';

import { AngleDownS } from '@synerise/ds-icon';
import * as S from './CardSummary.styles';
import { CardSummaryItemProps } from './CardSummary.types';
import { ANIMATION_DURATION } from '../constants';

export const CardSummaryItem = ({ label, value, summaryRowObjects, valueButton, ...rest }: CardSummaryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const withObjects = !!summaryRowObjects?.length;
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const icon = (
    <S.IconWrapper>
      <S.Icon isOpen={isOpen} component={<AngleDownS />} onClick={handleClick} />
    </S.IconWrapper>
  );
  return (
    <S.CardSummaryItemWrapper {...rest}>
      <S.CardSummaryItemDetailsWrapper>
        <S.CardSummaryItemDetails>
          <S.CardSummaryItemLabelValueWrapper>
            {label && <S.CardSummaryItemLabel size="small">{label}:</S.CardSummaryItemLabel>}
            <S.CardSummaryItemValue>
              {value} {withObjects && icon}
            </S.CardSummaryItemValue>
          </S.CardSummaryItemLabelValueWrapper>
        </S.CardSummaryItemDetails>
        {valueButton && <S.ValueButtonWrapper>{valueButton}</S.ValueButtonWrapper>}
      </S.CardSummaryItemDetailsWrapper>
      {withObjects && (
        <AnimateHeight duration={ANIMATION_DURATION} height={isOpen ? 'auto' : 0}>
          <S.CardSummaryItemObjects>
            {summaryRowObjects?.map(object => (
              <S.CardSummaryItemObject key={object.key || uuid()}>{object}</S.CardSummaryItemObject>
            ))}
          </S.CardSummaryItemObjects>
        </AnimateHeight>
      )}
    </S.CardSummaryItemWrapper>
  );
};
