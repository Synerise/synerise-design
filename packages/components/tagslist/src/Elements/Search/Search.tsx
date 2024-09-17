import React from 'react';

import { NOOP } from '@synerise/ds-utils';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

import useTagsListContext from '../../useTagsListContext';
import SearchContainer from './Search.styles';

const Search: React.FC = () => {
  const { searchQuery = '', setSearchQuery = NOOP, setSearchOpen = NOOP, texts } = useTagsListContext();

  const inputRef = React.useRef(null);

  const onChange = (query: string): void => setSearchQuery(query);
  const onToggle = (isOpen: boolean): void => setSearchOpen(isOpen);
  const onClear = (): void => setSearchQuery('');

  return (
    <SearchContainer data-testid="ds-tagslist-search-wrapper" ref={inputRef}>
      <SearchInput
        onChange={onChange}
        value={searchQuery || ''}
        closeOnClickOutside
        onToggle={onToggle}
        onClear={onClear}
        clearTooltip={texts?.searchClear}
      />
    </SearchContainer>
  );
};

export default Search;
