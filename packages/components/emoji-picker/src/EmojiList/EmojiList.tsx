import React, { useMemo } from 'react';
import Divider from '@synerise/ds-divider';
import Scrollbar from '@synerise/ds-scrollbar';
import { getEmojisByGroup } from 'unicode-emoji-utils';
import type { Emoji } from 'unicode-emoji-utils';

import * as S from './EmojiList.styles';
import { EmojiCategory, EmojiListProps } from './EmojiList.types';
import { useEmojiTranslations } from '../hooks/useEmojiTranslations';

export const EmojiList = ({ texts: customTexts, onSelect, searchQuery }: EmojiListProps) => {
  const texts = useEmojiTranslations(customTexts);

  const grouped = useMemo(() => getEmojisByGroup('group'), []);

  const filteredList = useMemo(() => {
    const items: EmojiCategory[] = [];
    grouped.forEach((emojis, category) => {
      const matching = searchQuery
        ? emojis.filter(emoji => emoji.keywords?.find(keyword => keyword.match(searchQuery)))
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

  const handleClick = (emoji: Emoji) => {
    // eslint-disable-next-line no-unused-expressions
    onSelect?.(emoji);
  };
  return (
    <Scrollbar maxHeight={330}>
      {filteredList.map(({ title, emojis }, index) => (
        <>
          <Divider labelBelow={title} hiddenLine={index === 0} />
          <S.EmojiCategoryWrapper>
            {emojis.map(emoji => (
              <S.EmojiItem key={emoji.emoji} data-testid="ds-emoji-item" onClick={() => handleClick(emoji)}>
                {emoji.emoji}
              </S.EmojiItem>
            ))}
          </S.EmojiCategoryWrapper>
        </>
      ))}
    </Scrollbar>
  );
};
