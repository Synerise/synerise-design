import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from '../InformationCard.styles';
import { InformationCardSummaryProps } from './InformationCardSummary.types';

export const InformationCardSummary = ({ items }: InformationCardSummaryProps) => {
  const itemsWithIDs = useMemo(() => items?.map(item => ({ id: uuid(), ...item })), [items]);
  return (
    <S.InformationCardSummaryWrapper data-testid="information-card-summary">
      {itemsWithIDs?.map(({ icon, label, tooltip, tooltipProps, id }) => {
        const item = (
          <S.InformationCardSummaryItem key={id}>
            {icon && <div>{icon}</div>}
            {label && <div>{label}</div>}
          </S.InformationCardSummaryItem>
        );
        return tooltip ? (
          <Tooltip title={tooltip} {...tooltipProps}>
            {item}
          </Tooltip>
        ) : (
          item
        );
      })}
    </S.InformationCardSummaryWrapper>
  );
};
