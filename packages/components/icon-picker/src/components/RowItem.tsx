import React, { type ReactElement, memo } from 'react';
import { areEqual } from 'react-window';

import * as S from '../IconPicker.styles';
import { type RowItemProps, type SourceType } from '../IconPicker.types';
import { isCategories } from '../utils/typeguards.utils';
import ListItem from './ListItem/ListItem';

export const RowItem = memo(
  <Source extends SourceType>({
    data,
    index,
    style,
  }: RowItemProps<Source>): ReactElement => {
    const { elementSize, itemsPerRow, onSelect, items } = data;
    const rowItems = items[index];

    return (
      <div style={style}>
        <S.ListRow>
          {isCategories(rowItems) ? (
            <S.Title elementSize={`${elementSize}px`}>
              {rowItems[0].category}
            </S.Title>
          ) : (
            rowItems.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  element={item}
                  itemsPerRow={itemsPerRow}
                  onSelect={onSelect}
                  index={i}
                />
              );
            })
          )}
        </S.ListRow>
      </div>
    );
  },
  areEqual,
);
