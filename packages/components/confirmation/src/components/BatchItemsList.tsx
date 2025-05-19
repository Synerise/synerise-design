import React from 'react';
import ListItem, { ListItemProps } from '@synerise/ds-list-item';
import type { BatchItemsListProps } from '../Confirmation.types';
import * as S from '../Confirmation.styles';
import { ITEM_SIZE, MAX_ITEMS } from '../Confirmation.const';

export const BatchItemsList = <ItemType extends ListItemProps>({ items, title }: BatchItemsListProps<ItemType>) => {
  return (
    <S.ConfirmationExtra>
      <S.ConfirmationExtraTitle level={6}>{title}</S.ConfirmationExtraTitle>
      <S.BatchItemsList maxHeight={ITEM_SIZE * MAX_ITEMS} absolute>
        {items.map(item => (
          <ListItem key={item.id} {...item} />
        ))}
      </S.BatchItemsList>
    </S.ConfirmationExtra>
  );
};
