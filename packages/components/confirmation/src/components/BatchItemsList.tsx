import React from 'react';

import ListItem, {
  ListContextProvider,
  type ListItemProps,
} from '@synerise/ds-list-item';
import Panel from '@synerise/ds-panel';

import { ITEM_SIZE, MAX_ITEMS } from '../Confirmation.const';
import * as S from '../Confirmation.styles';
import type { BatchItemsListProps } from '../Confirmation.types';

export const BatchItemsList = <ItemType extends ListItemProps>({
  items,
  title,
}: BatchItemsListProps<ItemType>) => {
  return (
    <S.ConfirmationExtra>
      <Panel label={title}>
        <ListContextProvider>
          <S.BatchItemsList maxHeight={ITEM_SIZE * MAX_ITEMS} absolute>
            {items.map((item) => (
              <ListItem key={item.id} {...item} />
            ))}
          </S.BatchItemsList>
        </ListContextProvider>
      </Panel>
    </S.ConfirmationExtra>
  );
};
