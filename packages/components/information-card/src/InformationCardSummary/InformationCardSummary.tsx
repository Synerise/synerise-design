import React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from '../InformationCard.styles';
import { InformationCardSummaryProps } from './InformationCardSummary.types';

export const InformationCardSummary = ({ items }: InformationCardSummaryProps) => {
  return (
    <S.InformationCardSummaryWrapper data-testid="information-card-summary">
      {items?.map(({ icon, label, tooltip, tooltipProps }) => {
        const item = (
          <S.InformationCardSummaryItem>
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
