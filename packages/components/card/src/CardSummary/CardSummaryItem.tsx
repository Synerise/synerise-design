import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { AngleDownS } from '@synerise/ds-icon';

import { ANIMATION_DURATION } from '../constants';
import * as S from './CardSummary.styles';
import type { CardSummaryItemProps } from './CardSummary.types';

export const CardSummaryItem = ({
  label,
  value,
  summaryObjects,
  summaryObjectsDirection = 'row',
  valueButton,
  ...rest
}: CardSummaryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const withObjects = !!summaryObjects?.length;
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const icon = (
    <S.IconWrapper>
      <S.Icon
        isOpen={isOpen}
        component={<AngleDownS />}
        onClick={handleClick}
      />
    </S.IconWrapper>
  );
  return (
    <S.CardSummaryItemWrapper {...rest}>
      <S.CardSummaryItemDetailsWrapper>
        <S.CardSummaryItemDetails>
          <S.CardSummaryItemLabelValueWrapper>
            {label && (
              <S.CardSummaryItemLabel size="small">
                {label}:
              </S.CardSummaryItemLabel>
            )}
            <S.CardSummaryItemValue>
              {value} {withObjects && icon}
            </S.CardSummaryItemValue>
          </S.CardSummaryItemLabelValueWrapper>
        </S.CardSummaryItemDetails>
        {valueButton && (
          <S.ValueButtonWrapper>{valueButton}</S.ValueButtonWrapper>
        )}
      </S.CardSummaryItemDetailsWrapper>
      {withObjects && (
        <AnimateHeight
          duration={ANIMATION_DURATION}
          height={isOpen ? 'auto' : 0}
        >
          <S.CardSummaryItemObjects direction={summaryObjectsDirection}>
            {summaryObjects?.map((object, index) => (
              <S.CardSummaryItemObject
                direction={summaryObjectsDirection}
                key={object.key ?? index}
              >
                {object}
              </S.CardSummaryItemObject>
            ))}
          </S.CardSummaryItemObjects>
        </AnimateHeight>
      )}
    </S.CardSummaryItemWrapper>
  );
};
