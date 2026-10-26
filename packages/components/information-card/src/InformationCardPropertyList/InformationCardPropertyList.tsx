import React from 'react';

import * as S from '../InformationCard.styles';
import type {
  InformationCardPropertyDivider,
  InformationCardPropertyItem,
  InformationCardPropertyListProps,
} from './InformationCardPropertyList.types';

const isDivider = (
  item: InformationCardPropertyItem,
): item is InformationCardPropertyDivider => {
  return 'type' in item && item.type === 'divider';
};
export const InformationCardPropertyList = ({
  items,
}: InformationCardPropertyListProps) => {
  return (
    <S.InformationCardPropertyListWrapper data-testid="information-card-property-list">
      {items?.map((item: InformationCardPropertyItem, index) => {
        if (isDivider(item)) {
          return <S.Divider dashed key={item.id ?? index} />;
        }
        const { label, value, id } = item;
        return (
          <S.InformationCardPropertyItem key={id ?? index}>
            {label && (
              <S.InformationCardPropertyItemLabel>
                {label}:
              </S.InformationCardPropertyItemLabel>
            )}
            <S.InformationCardPropertyItemValue>
              {value}
            </S.InformationCardPropertyItemValue>
          </S.InformationCardPropertyItem>
        );
      })}
    </S.InformationCardPropertyListWrapper>
  );
};
