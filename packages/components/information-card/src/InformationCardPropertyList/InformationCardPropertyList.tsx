import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import * as S from '../InformationCard.styles';
import { InformationCardPropertyListProps } from './InformationCardPropertyList.types';

export const InformationCardPropertyList = ({ items }: InformationCardPropertyListProps) => {
  const itemsWithIDs = useMemo(() => items?.map(item => ({ id: uuid(), ...item })), [items]);
  return (
    <S.InformationCardPropertyListWrapper data-testid="information-card-property-list">
      {itemsWithIDs?.map(({ type, label, value, id }) => {
        if (type === 'divider') {
          return <S.Divider dashed key={id} />;
        }
        return (
          <S.InformationCardPropertyItem key={id}>
            {label && <S.InformationCardPropertyItemLabel>{label}:</S.InformationCardPropertyItemLabel>}
            <S.InformationCardPropertyItemValue>{value}</S.InformationCardPropertyItemValue>
          </S.InformationCardPropertyItem>
        );
      })}
    </S.InformationCardPropertyListWrapper>
  );
};
