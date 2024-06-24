import React from 'react';

import * as S from '../InformationCard.styles';
import { InformationCardPropertyListProps } from './InformationCardPropertyList.types';

export const InformationCardPropertyList = ({ items }: InformationCardPropertyListProps) => {
  return (
    <S.InformationCardPropertyListWrapper data-testid="information-card-property-list">
      {items?.map(({ type, label, value }) => {
        if (type === 'divider') {
          return <S.Divider dashed />;
        }
        return (
          <S.InformationCardPropertyItem key="">
            {label && <S.InformationCardPropertyItemLabel>{label}:</S.InformationCardPropertyItemLabel>}
            <S.InformationCardPropertyItemValue>{value}</S.InformationCardPropertyItemValue>
          </S.InformationCardPropertyItem>
        );
      })}
    </S.InformationCardPropertyListWrapper>
  );
};
