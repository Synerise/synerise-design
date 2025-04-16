import React, { memo, ReactElement } from 'react';
import { areEqual } from 'react-window';

import ListItem from './ListItem/ListItem';
import { RowItemProps, SourceType } from '../IconPicker.types';
import * as S from '../IconPicker.styles';
import { isCategories } from '../utils/typeguards.utils';

export const RowItem = memo(<Source extends SourceType>({ data, index, style }: RowItemProps<Source>): ReactElement => {
  const { elementSize, itemsPerRow, onSelect, items } = data;
  const rowItems = items[index];

  return (
    <div style={style}>
      <S.ListRow>
        {isCategories(rowItems) ? (
          <S.Title elementSize={`${elementSize}px`}>{rowItems[0].category}</S.Title>
        ) : (
          rowItems.map((item, i) => {
            return (
              <ListItem key={i} element={item} itemsPerRow={itemsPerRow} onSelect={onSelect} index={i} /> // eslint-disable-line react/no-array-index-key
            );
          })
        )}
      </S.ListRow>
    </div>
  );
}, areEqual);
