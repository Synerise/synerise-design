import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import * as S from '../InformationCard.styles';
import {
  InformationCardPropertyItem,
  InformationCardPropertyListProps,
  InformationCardPropertyDivider,
} from './InformationCardPropertyList.types';

const isDivider = (item: InformationCardPropertyItem): item is InformationCardPropertyDivider => {
  return 'type' in item && item.type === 'divider';
};
export const InformationCardPropertyList = ({ items }: InformationCardPropertyListProps) => {
  const itemsWithIDs = useMemo(() => items?.map(item => ({ id: uuid(), ...item })), [items]);
  return (
    <S.InformationCardPropertyListWrapper data-testid="information-card-property-list">
      {itemsWithIDs?.map((item: InformationCardPropertyItem) => {
        if (isDivider(item)) {
          return <S.Divider dashed key={item.id} />;
        }
        const { label, value, id } = item;
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
