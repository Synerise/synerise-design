import React, { type UIEvent, useMemo, useRef } from 'react';
import type { FixedSizeList } from 'react-window';
import { getEmojisByGroup } from 'unicode-emoji-utils';

import EmptyState, { EmptyStatesSize } from '@synerise/ds-empty-states';
import { SearchNoResultsL } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import { ITEMS_PER_ROW, ITEM_SIZE } from '../EmojiPicker.const';
import { useEmojiTranslations } from '../hooks/useEmojiTranslations';
import { useMultipleItemsPerRow } from '../hooks/useMultipleItemsPerRow';
import * as S from './EmojiList.styles';
import type {
  EmojiCategory,
  EmojiListProps,
  RowItemProps,
} from './EmojiList.types';
import { createItemData } from './EmojiList.utils';
import { EmojiListItem } from './EmojiListItem';

export const EmojiList = ({
  texts: customTexts,
  onSelect,
  searchQuery,
}: EmojiListProps) => {
  const texts = useEmojiTranslations(customTexts);
  const listRef = useRef<FixedSizeList>(null);
  const grouped = useMemo(() => getEmojisByGroup('group'), []);

  const filteredList = useMemo(() => {
    const items: EmojiCategory[] = [];
    grouped.forEach((emojis, category) => {
      const matching = searchQuery
        ? emojis.filter((emoji) =>
            emoji.keywords?.find((keyword) => keyword.match(searchQuery)),
          )
        : emojis;
      if (matching.length) {
        items.push({
          title: texts[category] || category,
          emojis: matching,
        });
      }
    });
    return items;
  }, [searchQuery, grouped, texts]);

  const virtualListData = useMultipleItemsPerRow(filteredList, ITEMS_PER_ROW);
  const itemData = createItemData(
    virtualListData,
    ITEM_SIZE,
    onSelect,
    ITEMS_PER_ROW,
  );

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  return filteredList.length ? (
    <Scrollbar maxHeight={330} onScroll={handleScroll}>
      <S.VirtualList
        listHeight={330}
        ref={listRef}
        height={330}
        itemCount={virtualListData.length}
        itemData={itemData}
        itemSize={ITEM_SIZE}
        width="100%"
      >
        {(props) => <EmojiListItem {...(props as RowItemProps)} />}
      </S.VirtualList>
    </Scrollbar>
  ) : (
    <S.EmptyList>
      <EmptyState
        customIcon={<SearchNoResultsL />}
        size={EmptyStatesSize.SMALL}
        text={texts.empty}
      />
    </S.EmptyList>
  );
};
