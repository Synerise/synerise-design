import React, { type ReactElement, memo } from 'react';
import { areEqual } from 'react-window';
import { type Emoji } from 'unicode-emoji-utils';

import * as S from './EmojiList.styles';
import { type RowItemProps, type TitleItem } from './EmojiList.types';

const isTitle = (item: TitleItem[] | Emoji[]): item is TitleItem[] => {
  return item[0] && 'title' in item[0];
};
export const EmojiListItem = memo(
  ({ data, index, style }: RowItemProps): ReactElement => {
    const { elementSize, itemsPerRow, onSelect, items } = data;
    const rowItems = items[index];
    return (
      <div style={style}>
        <S.ListRow>
          {isTitle(rowItems) ? (
            <S.Title elementSize={`${elementSize}px`}>
              {rowItems[0].title}
            </S.Title>
          ) : (
            rowItems.map((item) => {
              return (
                <S.EmojiItem
                  onClick={() => onSelect && onSelect(item)}
                  itemsPerRow={itemsPerRow}
                  key={item.emoji}
                >
                  <S.EmojiButton data-testid="ds-emoji-item">
                    {item.emoji}
                  </S.EmojiButton>
                </S.EmojiItem>
              );
            })
          )}
        </S.ListRow>
      </div>
    );
  },
  areEqual,
);
