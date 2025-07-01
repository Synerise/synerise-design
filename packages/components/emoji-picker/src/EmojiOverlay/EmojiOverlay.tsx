import React, { useState } from 'react';

import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';

import { EmojiList } from '../EmojiList/EmojiList';
import { useEmojiTranslations } from '../hooks/useEmojiTranslations';
import { type EmojiOverlayType } from './EmojiOverlay.types';

export const EmojiOverlay = ({
  texts: customTexts,
  onSelect,
  focus,
}: EmojiOverlayType) => {
  const texts = useEmojiTranslations(customTexts);
  const [searchQuery, setSearchQuery] = useState('');
  const handleClearInput = () => {
    setSearchQuery('');
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <>
      <Dropdown.SearchInput
        onSearchChange={handleSearchChange}
        onClearInput={handleClearInput}
        placeholder={texts.placeholder}
        value={searchQuery}
        autofocus={focus}
        iconLeft={
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        }
      />
      <EmojiList onSelect={onSelect} searchQuery={searchQuery} texts={texts} />
    </>
  );
};
