import * as React from 'react';

import { sNOOPy } from '@synerise/ds-utils';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

import useTagsListContext from '../../useTagsListContext';
import SearchContainer from './Search.styles';

const Search: React.FC = () => {
  const { searchQuery = '', setSearchQuery = sNOOPy, setSearchOpen = sNOOPy } = useTagsListContext();

  const inputRef = React.useRef(null);

  const onChange = (query: string): void => setSearchQuery(query);
  const onToggle = (isOpen: boolean): void => setSearchOpen(isOpen);
  const onClear = (): void => setSearchQuery('');

  return (
    <SearchContainer ref={inputRef}>
      <SearchInput
        onChange={onChange}
        value={searchQuery || ''}
        closeOnClickOutside
        onToggle={onToggle}
        onClear={onClear}
      />
    </SearchContainer>
  );
};

export default Search;
