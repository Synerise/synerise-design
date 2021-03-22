import * as React from 'react';

import { NOOP } from '@synerise/ds-utils';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import useTreeMenuContext from '../../useTreeMenuContext';

import SearchContainer from './Search.styles';

const Search: React.FC = () => {
  const { searchQuery = '', setSearchQuery = NOOP, setSearchOpen = NOOP, texts } = useTreeMenuContext();

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
        clearTooltip={texts?.searchClear}
      />
    </SearchContainer>
  );
};

export default Search;
