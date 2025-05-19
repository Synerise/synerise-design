import React, { memo, ReactElement } from 'react';
import { areEqual } from 'react-window';
import { Emoji } from 'unicode-emoji-utils';

import { RowItemProps, TitleItem } from './EmojiList.types';
import * as S from './EmojiList.styles';

const isTitle = (item: TitleItem[] | Emoji[]): item is TitleItem[] => {
  return item[0] && 'title' in item[0];
};
export const EmojiListItem = memo(({ data, index, style }: RowItemProps): ReactElement => {
  const { elementSize, itemsPerRow, onSelect, items } = data;
  const rowItems = items[index];
  return (
    <div style={style}>
      <S.ListRow>
        {isTitle(rowItems) ? (
          <S.Title elementSize={`${elementSize}px`}>{rowItems[0].title}</S.Title>
        ) : (
          rowItems.map(item => {
            return (
              <S.EmojiItem onClick={() => onSelect && onSelect(item)} itemsPerRow={itemsPerRow} key={item.emoji}>
                <S.EmojiButton data-testid="ds-emoji-item">{item.emoji}</S.EmojiButton>
              </S.EmojiItem>
            );
          })
        )}
      </S.ListRow>
    </div>
  );
}, areEqual);
