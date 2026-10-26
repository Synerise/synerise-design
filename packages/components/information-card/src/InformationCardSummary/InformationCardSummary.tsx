import React from 'react';

import Tooltip from '@synerise/ds-tooltip';

import * as S from '../InformationCard.styles';
import type { InformationCardSummaryProps } from './InformationCardSummary.types';

export const InformationCardSummary = ({
  items,
}: InformationCardSummaryProps) => {
  return (
    <>
      <S.InformationCardSummaryWrapper data-testid="information-card-summary">
        {items?.map(
          ({ icon, label, tooltip, tooltipProps, id, key }, index) => {
            const itemKey = key ?? id ?? index;
            const item = (
              <S.InformationCardSummaryItem key={itemKey}>
                {icon && <div>{icon}</div>}
                {label && <div>{label}</div>}
              </S.InformationCardSummaryItem>
            );
            return tooltip ? (
              <Tooltip key={itemKey} title={tooltip} {...tooltipProps}>
                {item}
              </Tooltip>
            ) : (
              item
            );
          },
        )}
      </S.InformationCardSummaryWrapper>
    </>
  );
};
